"use client";

import { useState } from "react";
import { FieldError, Form, Input, Label, TextArea, TextField } from "react-aria-components";
import type { FormField, Keyed, Tone } from "@kneaders/content";
import { Button } from "./button";
import { Eyebrow } from "./eyebrow";

const input =
  "w-full rounded-[10px] border border-k-line bg-k-bg-warm px-4 py-3.5 font-body text-[15px] text-k-black focus:border-k-red focus:outline-none";

const autoComplete: Partial<Record<FormField["kind"], string>> = { email: "email", tel: "tel" };

const fieldWidth = (f: FormField) => (f.width === "full" ? "col-span-2" : "col-span-2 sm:col-span-1");

/**
 * CMS-configured form. Submission is a stub for now —
 * TODO: post to an API route / form service keyed by `formId`.
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
  const [sent, setSent] = useState(false);
  return (
    <Form
      data-form-id={formId}
      aria-label={`${submitLabel} form`}
      className={`grid grid-cols-2 gap-4 rounded-[20px] border border-k-line p-[clamp(20px,3vw,36px)] ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
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
            <FieldError className="font-body text-sm text-k-red" />
          </TextField>
        ),
      )}
      <div className="col-span-2 flex items-center justify-end gap-4">
        {/* Always mounted so screen readers announce the message when it appears. */}
        <span role="status" className="font-body text-sm italic text-k-maroon empty:absolute">
          {sent && "Thanks — we'll be in touch within one business day."}
        </span>
        <Button type="submit" tone={submitTone} ink="tan" arrow>
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
