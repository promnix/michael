"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialPayload: ContactPayload = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
};

export function ContactForm() {
  const [payload, setPayload] = useState<ContactPayload>(initialPayload);
  const [status, setStatus] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");

  const updateField = (field: keyof ContactPayload, value: string) => {
    setPayload((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "The message could not be sent.");
      }

      setPayload(initialPayload);
      setStatus("success");
      setFeedback(result.message || "Message sent. I will reply soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "The message could not be sent.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="section-card rounded-[2rem] p-5 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-silver">
          Name
          <input
            required
            value={payload.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition placeholder:text-silver/60 focus:border-brass"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2 text-sm text-silver">
          Email
          <input
            required
            type="email"
            value={payload.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition placeholder:text-silver/60 focus:border-brass"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm text-silver">
          Project type
          <select
            required
            value={payload.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition focus:border-brass"
          >
            <option value="">Select one</option>
            <option>Business website</option>
            <option>Landing page</option>
            <option>MVP or web app</option>
            <option>WordPress website</option>
            <option>Other</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-silver">
          Budget
          <select
            value={payload.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition focus:border-brass"
          >
            <option value="">Not sure yet</option>
            <option>$200 - $500</option>
            <option>$500 - $1,000</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500+</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm text-silver md:col-span-2">
          Timeline
          <input
            value={payload.timeline}
            onChange={(event) => updateField("timeline", event.target.value)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition placeholder:text-silver/60 focus:border-brass"
            placeholder="Example: launch in 4 weeks"
          />
        </label>

        <label className="grid gap-2 text-sm text-silver md:col-span-2">
          Project details
          <textarea
            required
            value={payload.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="min-h-40 resize-y rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-cream outline-none transition placeholder:text-silver/60 focus:border-brass"
            placeholder="Tell me what you need, what exists already, and what a good outcome looks like."
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="micro-press inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-charcoal transition hover:-translate-y-0.5 hover:bg-cream disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowUpRight size={16} />}
          Send project details
        </button>

        {feedback ? (
          <p className={`inline-flex items-center gap-2 text-sm ${status === "success" ? "text-brass" : "text-rose"}`}>
            {status === "success" ? <CheckCircle2 size={16} /> : null}
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
