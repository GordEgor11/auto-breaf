"use client";

export default function CopyLinkButton({ userId }: { userId: string }) {
  return (
    <button
      className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
      type="button"
      onClick={async () => {
        const url = `${window.location.origin}/brief/${userId}`;
        try {
          await navigator.clipboard.writeText(url);
          alert('Ссылка скопирована!');
        } catch {
          const textarea = document.createElement('textarea');
          textarea.value = url;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          alert('Ссылка скопирована!');
        }
      }}
    >
      <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
      Копировать
    </button>
  );
}
