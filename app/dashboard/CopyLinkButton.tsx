"use client";

export default function CopyLinkButton({ agentId }: { agentId: string }) {
  return (
    <>
      <button
        className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-105"
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
        🔗 Копировать
      </button>
      <p className="text-xs text-slate-400">
        Ваша ссылка: <code className="bg-white/10 px-2 py-1 rounded text-slate-300">{typeof window !== 'undefined' ? `${window.location.origin}/brief/${agentId}` : '...'}</code>
      </p>
    </>
  );
}
