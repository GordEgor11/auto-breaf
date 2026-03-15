export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-6">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Auto-brief MVP
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight">
            Сбор заявок на просмотр недвижимости и авто-формирование брифа
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            Клиент заполняет форму, агент получает уведомление и готовый бриф.
            Далее — кабинет с заявками и PDF по запросу.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
              href="/brief"
            >
              Заполнить бриф
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
              href="/dashboard"
            >
              Кабинет агента
            </a>
            <a
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-semibold text-zinc-600 transition hover:border-zinc-300"
              href="/pricing"
            >
              Тарифы
            </a>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Публичная форма",
              text: "Клиент оставляет критерии, сроки и контакты.",
            },
            {
              title: "Уведомления",
              text: "Telegram + email fallback с кратким брифом.",
            },
            {
              title: "PDF по запросу",
              text: "Единый документ для быстрого созвона.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Как это работает</h2>
            <ol className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>1. Клиент заполняет короткий бриф на публичной странице.</li>
              <li>2. Заявка сразу появляется в кабинете агента.</li>
              <li>3. Telegram уведомляет о новой заявке.</li>
              <li>4. PDF‑бриф можно скачать в один клик.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Документация</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Подключение Telegram и размещение ссылки на бриф.
            </p>
            <a
              className="mt-4 inline-flex text-sm font-semibold text-zinc-900 underline underline-offset-4"
              href="/docs"
            >
              Открыть мини‑доки
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
