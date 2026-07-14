"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  );
}

// Green accent (--mix-accent) is set to #00EB03 on the /remix route via
// html[data-product="remix"]. The bright green needs dark text for contrast.
const variantStyles = {
  primary:
    "rounded-lg bg-[var(--mix-accent)] py-2.5 px-6 text-[#05040A] font-semibold shadow-[0_4px_20px_var(--mix-accent-glow)] hover:-translate-y-px hover:shadow-[0_6px_28px_var(--mix-accent-glow)] hover:brightness-110",
  secondary:
    "rounded-lg bg-[var(--mix-surface-bright)] py-2.5 px-6 text-white border border-[var(--mix-border-card)] hover:bg-white/[0.05]",
  ghost:
    "text-[var(--mix-accent)] hover:brightness-125",
} as const;

type RemixButtonProps = {
  variant?: keyof typeof variantStyles;
  arrow?: "right";
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
);

export function RemixButton({
  variant = "primary",
  className,
  children,
  arrow,
  ...props
}: RemixButtonProps) {
  className = clsx(
    "group inline-flex gap-1.5 items-center justify-center overflow-hidden text-[15px] cursor-pointer",
    "transition-[transform,box-shadow,filter,background-color,color] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mix-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--mix-bg)]",
    variantStyles[variant],
    className
  );

  const inner = (
    <>
      {children}
      {arrow === "right" && (
        <ArrowIcon className="h-5 w-5 -mr-1 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (typeof props.href === "undefined") {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    );
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  );
}
