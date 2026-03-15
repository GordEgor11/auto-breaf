export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Тарифы</h1>
          <p className="text-sm text-zinc-600">
            MVP без платежей. Здесь будет простая линейка тарифов.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Старт
            </div>
            <h2 className="mt-3 text-2xl font-semibold">0 ₽</h2>
            <p className="mt-2 text-sm text-zinc-600">
              1 агент, 1 форма, базовые уведомления.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>— Telegram</li>
              <li>— PDF‑бриф</li>
              <li>— 1 проект</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900 p-6 text-white shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
              Профи
            </div>
            <h2 className="mt-3 text-2xl font-semibold">1 990 ₽</h2>
            <p className="mt-2 text-sm text-zinc-200">
              Для активных агентов и студий.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-200">
              <li>— Фильтры и сегменты</li>
              <li>— Экспорт PDF</li>
              <li>— История заявок</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Команда
            </div>
            <h2 className="mt-3 text-2xl font-semibold">4 990 ₽</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Для агентств и офисов продаж.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-600">
              <li>— Роли и доступы</li>
              <li>— Мульти‑агенты</li>
              <li>— Интеграции</li>
            </ul>
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
