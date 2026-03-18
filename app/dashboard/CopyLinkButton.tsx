"use client";

export default function CopyLinkButton({ agentId }: { agentId: string }) {
  return (
    <>
      <button
        className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
        type="button"
        onClick={async () => {
          const url = `${window.location.origin}/brief/${agentId}`;
          try {
            await navigator.clipboard.writeText(url);
            alert('Ссылка на бриф скопирована!');
          } catch {
            const textarea = document.createElement('textarea');
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Ссылка на бриф скопирована!');
          }
        }}
      >
        Копировать ссылку
      </button>
      <p className="text-xs text-zinc-500">
        Ваша ссылка: <code className="bg-zinc-100 px-2 py-1 rounded">{typeof window !== 'undefined' ? `${window.location.origin}/brief/${agentId}` : '...'}</code>
      </p>
    </>
  );
}
