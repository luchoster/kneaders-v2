import type { Keyed, ValueItem } from "@kneaders/content";
import { Reveal } from "./reveal";

/** Values as a 2×2 of hairline-topped entries: title and a short paragraph. */
export function ValueList({ values, className = "" }: { values: Keyed<ValueItem>[]; className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 ${className}`}>
      {values.map((v, i) => (
        <Reveal key={v._key} delay={i * 70} className="flex flex-col gap-3 border-t border-k-line pt-5">
          <h3 className="type-h4">{v.title}</h3>
          <p className="type-body">{v.body}</p>
        </Reveal>
      ))}
    </div>
  );
}
