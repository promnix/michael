import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send Michael Odugu your project details for a website, landing page, MVP, or WordPress build.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Michael Odugu",
    description:
      "Send project details through the contact form and start a focused website or product build.",
    url: "/contact",
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="section-shell py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <section>
          <p className="eyebrow text-xs text-brass">Contact</p>
          <h1 className="mt-4 max-w-xl font-display text-5xl text-balance md:text-6xl">
            Tell me what you want to build.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-silver md:text-base">
            Share the project context, timeline, and what success should look like. The form sends the details directly, so every contact button now starts here.
          </p>

          <div className="mt-8 grid gap-4">
            {/* <div className="section-card rounded-[1.5rem] p-5">
              <p className="text-xs text-silver">Based in</p>
              <p className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-cream">
                <MapPin size={16} className="text-brass" />
                {siteConfig.location}
              </p>
            </div> */}
            <div className="section-card rounded-[1.5rem] p-5">
              <p className="text-xs text-silver">Availability</p>
              <p className="mt-2 text-lg font-semibold text-cream">{siteConfig.availability}</p>
            </div>
          </div>
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
