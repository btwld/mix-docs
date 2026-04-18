import type { ReactNode } from "react";

interface CodeGroupProps {
  title?: string;
  defaultLanguage?: string;
  children: ReactNode;
}

export function CodeGroup({ title, children }: CodeGroupProps) {
  return (
    <div className="code-group my-6">
      {title ? (
        <div className="code-group__title text-xs uppercase tracking-wide text-[var(--mix-text-muted)] mb-2">
          {title}
        </div>
      ) : null}
      <div className="code-group__body">{children}</div>
    </div>
  );
}

export default CodeGroup;
