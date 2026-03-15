"use client";

import { useState } from "react";

type LeadActionsProps = {
  phone: string;
};

function normalizePhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("7")) return digits;
  if (digits.startsWith("8")) return `7${digits.slice(1)}`;
  if (digits.length === 10) return `7${digits}`;
  return digits;
}

export default function LeadActions({ phone }: LeadActionsProps) {
  const [copied, setCopied] = useState(false);
  const digits = normalizePhoneDigits(phone);
  const whatsappLink = digits ? `https://wa.me/${digits}` : "#";
  const telegramDeepLink = digits ? `tg://resolve?phone=${digits}` : "";
  const telegramWebLink = digits ? `https://t.me/+${digits}` : "#";

  async function handleCopy() {
    if (!phone) return;
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="rounded-full border border-zinc-300 px-3 py-1 text-[11px] font-semibold text-zinc-700 hover:border-zinc-400"
        type="button"
        onClick={handleCopy}
      >
        {copied ? "Скопировано" : "Копировать"}
      </button>
      <a
        className="rounded-full border border-zinc-300 px-3 py-1 text-[11px] font-semibold text-zinc-700 hover:border-zinc-400"
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      <a
        className="rounded-full border border-zinc-300 px-3 py-1 text-[11px] font-semibold text-zinc-700 hover:border-zinc-400"
        href={telegramWebLink}
        onClick={(event) => {
          if (!telegramDeepLink) return;
          event.preventDefault();
          window.location.href = telegramDeepLink;
          window.setTimeout(() => {
            window.open(telegramWebLink, "_blank", "noreferrer");
          }, 700);
        }}
      >
        Telegram
      </a>
    </div>
  );
}
