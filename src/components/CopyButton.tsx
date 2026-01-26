"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_NFC_URL}/${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 rounded-full border px-1 py-1 text-sm
                 hover:text-slate-500 text-white  transition "
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 " />
      )}
      {copied ? "Copied" : "NFC-ID"}
    </button>
  );
}
