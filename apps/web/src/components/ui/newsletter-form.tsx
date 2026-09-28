"use client";

import { useState } from "react";

/** Email capture pill. TODO: wire `onSubmit` to the ESP (Mailchimp/Klaviyo/etc). */
export function NewsletterForm({
  placeholder = "you@goodmorning.com",
  buttonLabel = "Subscribe",
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}) {
  const [done, setDone] = useState(false);
  return (
    <form
      className={`flex gap-2 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <input
        type="email"
        required
        placeholder={placeholder}
        aria-label="Email"
        className={`min-w-0 flex-1 rounded-full border bg-transparent px-4 py-3 font-body text-sm placeholder:opacity-60 ${inputClassName}`}
      />
      <button
        type="submit"
        className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] ${buttonClassName}`}
      >
        {done ? "Thanks!" : buttonLabel}
      </button>
    </form>
  );
}
