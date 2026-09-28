"use client";

import { useState } from "react";
import type { FormField, Keyed, Tone } from "@kneaders/content";
import { Button } from "./button";
import { Eyebrow } from "./eyebrow";

const input =
  "w-full rounded-[10px] border border-k-line bg-k-bg-warm px-4 py-3.5 font-body text-[15px] text-k-black focus:border-k-red focus:outline-none";

/**
 * CMS-configured form. Submission is a stub for now —
 * TODO: post to an API route / form service keyed by `formId`.
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
    <form
      data-form-id={formId}
      className={`grid grid-cols-2 gap-4 rounded-[20px] border border-k-line p-[clamp(20px,3vw,36px)] ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((f) => (
        <label
          key={f._key}
          className={`flex flex-col gap-2 ${f.width === "full" ? "col-span-2" : "col-span-2 sm:col-span-1"}`}
        >
          <Eyebrow>{f.label}</Eyebrow>
          {f.kind === "textarea" ? (
            <textarea name={f.name} rows={f.rows ?? 4} required={f.required} placeholder={f.placeholder} className={`${input} resize-y`} />
          ) : f.kind === "select" ? (
            <select name={f.name} required={f.required} className={`${input} appearance-auto`}>
              {(f.options ?? []).map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              name={f.name}
              type={f.kind}
              min={f.min}
              required={f.required}
              placeholder={f.placeholder}
              className={input}
            />
          )}
        </label>
      ))}
      <div className="col-span-2 flex items-center justify-end gap-4">
        {sent && (
          <span role="status" className="font-body text-sm italic text-k-maroon">
            Thanks — we'll be in touch within one business day.
          </span>
        )}
        <Button type="submit" tone={submitTone} ink="tan" arrow>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
