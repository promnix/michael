"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  trackContactClick,
  trackEmailClick,
  trackExternalLinkClick,
  trackProjectView,
  trackProjectVisit,
  trackResumeDownload,
} from "@/lib/analytics";

type TrackingEvent =
  | { type: "contact_click"; location: string; label?: string }
  | { type: "email_click"; location: string; label?: string }
  | { type: "project_view"; location: string; projectTitle: string }
  | { type: "project_visit"; location?: string; projectTitle: string; url: string }
  | { type: "external_link_click"; location?: string; label: string; url: string }
  | { type: "resume_download"; location: string; label?: string };

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  children: ReactNode;
  tracking: TrackingEvent;
};

function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

function trackEvent(tracking: TrackingEvent) {
  switch (tracking.type) {
    case "contact_click":
      trackContactClick(tracking.location, tracking.label);
      break;
    case "email_click":
      trackEmailClick(tracking.location, tracking.label);
      break;
    case "project_view":
      trackProjectView(tracking.projectTitle, tracking.location);
      break;
    case "project_visit":
      trackProjectVisit(tracking.projectTitle, tracking.url, tracking.location);
      break;
    case "external_link_click":
      trackExternalLinkClick(tracking.label, tracking.url, tracking.location);
      break;
    case "resume_download":
      trackResumeDownload(tracking.location, tracking.label);
      break;
  }
}

export function TrackedLink({ href, tracking, children, ...props }: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (props["aria-disabled"] === true || event.defaultPrevented) {
      return;
    }

    trackEvent(tracking);
  };

  if (isInternalHref(href)) {
    return (
      <Link href={href} {...props} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
