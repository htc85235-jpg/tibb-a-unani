"use client";
import { site, waLink } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Assalam-o-Alaikum! I have a question about your herbal products.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send a message via WhatsApp"
      title="Send a message via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-emerald-900/30 transition hover:scale-105"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 00-8.4 15.2L2.1 22l4.9-1.5A9.9 9.9 0 1012.04 2zm0 1.8a8.1 8.1 0 11-4.1 15.1l-.3-.2-2.9.9.9-2.8-.2-.3a8.1 8.1 0 016.6-12.7zm-3.1 4c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2s.9 2.6 1 2.8c.1.2 1.8 2.9 4.5 4 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.3 7.3 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.5L9.7 8.3c-.2-.4-.4-.4-.6-.4h-.2z" />
      </svg>
    </a>
  );
}
