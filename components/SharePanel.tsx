"use client";

import { useCallback, useState } from "react";

interface SharePanelProps {
  shareUrl: string;
}

export default function SharePanel({ shareUrl }: SharePanelProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  if (!shareUrl) return null;

  return (
    <section
      className="mt-8 w-full max-w-[520px] rounded border border-parchment-dark/50 bg-white/50 px-5 py-4"
      aria-label="Shareable link"
    >
      <h3 className="mb-2 font-body text-sm font-semibold text-[var(--ink)]">
        Your letter is sealed — share this link
      </h3>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          readOnly
          value={shareUrl}
          aria-label="Shareable letter URL"
          className="min-w-0 flex-1 rounded border border-parchment-dark/40 bg-parchment-light px-3 py-2 font-body text-xs text-[var(--ink-muted)]"
          onFocus={(e) => e.target.select()}
        />
        <button
          type="button"
          onClick={copyLink}
          className="shrink-0 rounded bg-parchment-dark px-4 py-2 font-body text-sm font-medium text-[var(--ink)] transition hover:bg-[#b8a68a]"
          aria-label="Copy share link to clipboard"
        >
          {copied ? "✓ Copied!" : "Copy link"}
        </button>
      </div>
    </section>
  );
}
