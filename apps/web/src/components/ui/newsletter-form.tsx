"use client";

import { useState } from "react";
import { Button, Form, Input, TextField } from "react-aria-components";

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
    <Form
      aria-label="Newsletter signup"
      className={`flex gap-2 ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <TextField type="email" name="email" isRequired aria-label="Email address" autoComplete="email" className="flex min-w-0 flex-1">
        <Input
          placeholder={placeholder}
          className={`min-w-0 flex-1 rounded-full border bg-transparent px-4 py-3 font-body text-sm placeholder:opacity-60 ${inputClassName}`}
        />
      </TextField>
      <Button
        type="submit"
        className={`inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] ${buttonClassName}`}
      >
        {done ? "Thanks!" : buttonLabel}
      </Button>
      <span role="status" className="sr-only">
        {done && "Thanks for subscribing."}
      </span>
    </Form>
  );
}
