export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Мини‑документация</h1>
          <p className="text-sm text-zinc-600">
            Быстрые инструкции по подключению Telegram и размещению формы.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">1. Подключение Telegram</h2>
          <ol className="mt-4 space-y-3 text-sm text-zinc-600">
            <li>1. Создай бота в @BotFather и получи токен.</li>
            <li>2. Напиши боту любое сообщение.</li>
            <li>
              3. Открой: <span className="font-mono">https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</span>
            </li>
            <li>4. Найди <span className="font-mono">chat.id</span> и запиши в ENV.</li>
            <li>
              5. В файле <span className="font-mono">.env.local</span> добавь:
              <div className="mt-2 rounded-xl bg-zinc-900 p-3 text-xs text-zinc-100">
                TELEGRAM_BOT_TOKEN=...<br />
                TELEGRAM_CHAT_ID=...
              </div>
            </li>
          </ol>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">2. Размещение ссылки на бриф</h2>
          <p className="mt-3 text-sm text-zinc-600">
            Скопируй ссылку на страницу брифа и размести в Instagram, Avito или на сайте.
          </p>
          <div className="mt-3 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-700">
            <span className="font-mono">https://&lt;ваш-домен&gt;/brief</span>
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">3. Что делать, если PDF не открывается</h2>
          <p className="mt-3 text-sm text-zinc-600">
            Убедись, что установлен Chromium для Playwright:
          </p>
          <div className="mt-3 rounded-xl bg-zinc-900 p-3 text-xs text-zinc-100">
            npx playwright install chromium
          </div>
        </section>

        <a
          className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
          href="/"
        >
          Назад на лендинг
        </a>
      </main>
    </div>
  );
}
