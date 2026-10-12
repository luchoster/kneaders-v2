import type { FormField } from "@kneaders/content";
import { HONEYPOT } from "@/lib/forms";
import { isSanityConfigured } from "@/lib/sanity/env";
import { writeClient, writeToken } from "@/lib/sanity/write-client";

/**
 * Stores a submission of a CMS-configured form (`formSection`) as a
 * `formSubmission` document. The form's published definition is the
 * whitelist: only its fields are kept, and required / email / select / number
 * rules are enforced here as well as in the browser.
 */

const MAX_BODY_BYTES = 20_000;
const MAX_LENGTH = { textarea: 5000, other: 500 } as const;

const FORM_QUERY = /* groq */ `
*[_type in ["page", "homePage"] && count(sections[_type == "formSection" && formId == $formId]) > 0][0]
  .sections[_type == "formSection" && formId == $formId][0].fields[]{ name, label, kind, options, min, required }`;

type FieldErrors = Record<string, string>;

const json = (body: unknown, status = 200) => Response.json(body, { status });

function validate(field: FormField, value: string): string | null {
  if (!value) return field.required ? "Please fill out this field." : null;
  const max = field.kind === "textarea" ? MAX_LENGTH.textarea : MAX_LENGTH.other;
  if (value.length > max) return `Please keep this under ${max} characters.`;
  if (field.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
  if (field.kind === "select" && field.options?.length && !field.options.includes(value)) return "Please choose an option.";
  if (field.kind === "number") {
    const n = Number(value);
    if (!Number.isFinite(n)) return "Please enter a number.";
    if (field.min != null && n < field.min) return `Please enter ${field.min} or more.`;
  }
  return null;
}

export async function POST(request: Request) {
  if (!isSanityConfigured || !writeToken) {
    return json({ error: "Form submissions are not configured." }, 503);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Submission is too large." }, 413);

  let body: { formId?: unknown; page?: unknown; values?: unknown };
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid submission." }, 400);
  }

  const { formId, page } = body;
  const values = (body.values && typeof body.values === "object" ? body.values : {}) as Record<string, unknown>;
  if (typeof formId !== "string" || !/^[\w-]{1,100}$/.test(formId)) return json({ error: "Unknown form." }, 400);

  // Pretend success so bots get no signal.
  if (typeof values[HONEYPOT] === "string" && values[HONEYPOT]) return json({ ok: true });

  const fields = await writeClient.fetch<FormField[] | null>(FORM_QUERY, { formId });
  if (!fields?.length) return json({ error: "Unknown form." }, 400);

  const fieldErrors: FieldErrors = {};
  const entries = fields.map((field) => {
    const value = typeof values[field.name] === "string" ? (values[field.name] as string).trim() : "";
    const error = validate(field, value);
    if (error) fieldErrors[field.name] = error;
    return { _key: field.name, _type: "formEntry", name: field.name, label: field.label, value };
  });
  if (Object.keys(fieldErrors).length) return json({ error: "Please check the highlighted fields.", fieldErrors }, 400);

  await writeClient.create({
    _type: "formSubmission",
    status: "new",
    formId,
    page: typeof page === "string" && page.startsWith("/") ? page.slice(0, 200) : undefined,
    submittedAt: new Date().toISOString(),
    entries,
  });

  return json({ ok: true });
}
