"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LandingButton } from "./LandingButton";
import { EASE } from "./motion";
import type { ProductSlug } from "./types";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm({ product }: { product: ProductSlug }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="success"
            className="lp-wl-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <CheckCircle2 size={20} strokeWidth={2} />
            {message}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            className="lp-wl-form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              aria-label="Email address"
              className="lp-wl-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <LandingButton type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Joining…" : "Join waitlist"}
            </LandingButton>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="lp-wl-status is-error" role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
