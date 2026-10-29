"use client";

import { useState } from "react";
import { FieldError, Form, Input, Label, TextArea, TextField } from "react-aria-components";
import type { FormField, Keyed, Tone } from "@kneaders/content";
import { HONEYPOT } from "@/lib/forms";
import { Button } from "./button";
import { Eyebrow } from "./eyebrow";

const input =
  "w-full rounded-[10px] border border-k-line bg-k-bg-warm px-4 py-3.5 font-body text-[15px] text-k-black focus:border-k-brown focus:outline-none";

const autoComplete: Partial<Record<FormField["kind"], string>> = { email: "email", tel: "tel" };

const fieldWidth = (f: FormField) => (f.width === "full" ? "col-span-2" : "col-span-2 sm:col-span-1");

type Status = "idle" | "sending" | "sent" | "error";

const messages: Record<Status, string> = {
  idle: "",
  sending: "Sending…",
  sent: "Thanks! Your message was sent.",
  error: "Sorry, your message couldn't be sent. Please try again.",
};

/**
 * CMS-configured form. Submissions go to `POST /api/forms`, which stores them
 * in Sanity as `formSubmission` documents keyed by `formId`.
 *
 * Built on React Aria `Form` / `TextField`: every control has an associated
 * label, `required` is exposed to assistive tech, and validation errors are
 * announced and linked through `aria-describedby`.
 */
export function InquiryForm({
  formId,
  fields,
  submitLabel,
  submitTone,
  className = "",
}: {
  formId: string;
  fields: Keyed<FormField>[];
  submitLabel: string;
  submitTone: Tone;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  async function submit(form: HTMLFormElement) {
    if (status === "sending") return;
    setStatus("sending");
    setMessage(messages.sending);
    setValidationErrors({});
    const values = Object.fromEntries(
      [...new FormData(form).entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]),
    );
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, page: window.location.pathname, values }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Record<string, string> };
      if (!res.ok) {
        if (data.fieldErrors) setValidationErrors(data.fieldErrors);
        setStatus("error");
        setMessage(data.fieldErrors && data.error ? data.error : messages.error);
        return;
      }
      form.reset();
      setStatus("sent");
      setMessage(messages.sent);
    } catch {
      setStatus("error");
      setMessage(messages.error);
    }
  }

  return (
    <Form
      data-form-id={formId}
      aria-label={`${submitLabel} form`}
      aria-busy={status === "sending"}
      validationErrors={validationErrors}
      className={`grid grid-cols-2 gap-4 rounded-[20px] border border-k-line p-[clamp(20px,3vw,36px)] ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        void submit(e.currentTarget);
      }}
    >
      {/* Honeypot: off-screen and hidden from assistive tech; real visitors never fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {fields.map((f) =>
        f.kind === "select" ? (
          // Native <select>: fully accessible and keeps the OS picker the design already uses.
          <label key={f._key} className={`flex flex-col gap-2 ${fieldWidth(f)}`}>
            <Eyebrow>{f.label}</Eyebrow>
            <select name={f.name} required={f.required} className={`${input} appearance-auto`}>
              {(f.options ?? []).map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ) : (
          <TextField
            key={f._key}
            name={f.name}
            type={f.kind === "textarea" ? undefined : f.kind}
            isRequired={f.required}
            autoComplete={autoComplete[f.kind]}
            className={`flex flex-col gap-2 ${fieldWidth(f)}`}
          >
            <Label>
              <Eyebrow>{f.label}</Eyebrow>
            </Label>
            {f.kind === "textarea" ? (
              <TextArea rows={f.rows ?? 4} placeholder={f.placeholder} className={`${input} resize-y`} />
            ) : (
              <Input min={f.min} placeholder={f.placeholder} className={input} />
            )}
            <FieldError className="font-body text-sm text-k-brown" />
          </TextField>
        ),
      )}
      <div className="col-span-2 flex items-center justify-end gap-4">
        {/* Always mounted so screen readers announce the message when it appears. */}
        <span role="status" className="font-body text-sm italic text-k-ink-2 empty:absolute">
          {message}
        </span>
        <Button type="submit" tone={submitTone} ink="tan" arrow>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
