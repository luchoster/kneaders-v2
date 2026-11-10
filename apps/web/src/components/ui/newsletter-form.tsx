"use client";

import { useState } from "react";
import { Button, Form, Input, TextField } from "react-aria-components";

const buttons = {
  primary: "bg-k-accent hover:bg-k-accent-hover",
  ink: "bg-k-ink hover:bg-[#3a3334]",
} as const;

/** Email capture: pill input + pill button. TODO: wire `onSubmit` to the ESP (Mailchimp/Klaviyo/etc). */
export function NewsletterForm({
  placeholder = "Your email",
  buttonLabel = "Subscribe",
  variant = "primary",
  className = "",
}: {
  placeholder?: string;
  buttonLabel?: string;
  variant?: keyof typeof buttons;
  className?: string;
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
          className="min-w-0 flex-1 rounded-full border border-k-field-line bg-white px-[18px] py-3 font-body text-[15px] text-k-ink transition-colors duration-200 placeholder:text-k-ink-3 focus:border-k-ink"
        />
      </TextField>
      <Button
        type="submit"
        className={`inline-flex cursor-pointer items-center whitespace-nowrap rounded-full px-5 py-3 font-body text-sm font-medium tracking-[0.01em] text-k-bg transition-colors duration-[250ms] ${buttons[variant]}`}
      >
        {done ? "Thanks!" : buttonLabel}
      </Button>
      <span role="status" className="sr-only">
        {done && "Thanks for subscribing."}
      </span>
    </Form>
  );
}
