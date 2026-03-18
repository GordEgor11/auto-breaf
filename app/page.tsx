import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden">
      {/* Background Pattern - Building Silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900" />
        
        {/* Building Silhouettes - Bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-64 w-full opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        {/* Building Blocks */}
        <div className="absolute bottom-0 left-10 w-20 h-40 bg-zinc-700/30 rounded-t-lg" />
        <div className="absolute bottom-0 left-32 w-16 h-56 bg-zinc-700/30 rounded-t-lg" />
        <div className="absolute bottom-0 left-52 w-24 h-32 bg-zinc-700/30 rounded-t-lg" />
        <div className="absolute bottom-0 right-10 w-20 h-48 bg-zinc-700/30 rounded-t-lg" />
        <div className="absolute bottom-0 right-36 w-16 h-36 bg-zinc-700/30 rounded-t-lg" />
        <div className="absolute bottom-0 right-60 w-28 h-52 bg-zinc-700/30 rounded-t-lg" />
        
        {/* Windows Pattern */}
        <div className="absolute bottom-10 left-14 grid grid-cols-2 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-3 bg-amber-400/20 rounded-sm" />
          ))}
        </div>
        <div className="absolute bottom-10 right-14 grid grid-cols-2 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-3 bg-amber-400/20 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-zinc-700/50 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Decor CRM</span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <a
                  className="text-sm font-medium text-zinc-300 transition hover:text-white"
                  href="/dashboard"
                >
                  Кабинет
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
                  href="/dashboard"
                >
                  Мои заявки
                </a>
              </>
            ) : (
              <>
                <a
                  className="text-sm font-medium text-zinc-300 transition hover:text-white"
                  href="/login"
                >
                  Войти
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:scale-105"
                  href="/register"
                >
                  Начать работу
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
            </span>
            Auto-brief CRM для агентств недвижимости
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Заявки на просмотр
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              с авто-брифом
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-zinc-400 md:text-xl max-w-2xl mx-auto">
            Клиенты оставляют заявки на сайте → вы получаете готовый бриф в Telegram → 
            закрываете сделку быстрее
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105"
                href="/dashboard"
              >
                Перейти в кабинет
              </a>
            ) : (
              <>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105"
                  href="/register"
                >
                  Попробовать бесплатно
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800/50 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-700/50 hover:scale-105"
                  href="/pricing"
                >
                  Тарифы
                </a>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0%</div>
              <div className="mt-1 text-sm text-zinc-400">Потерь заявок</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="mt-1 text-sm text-zinc-400">Приём заявок</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">PDF</div>
              <div className="mt-1 text-sm text-zinc-400">Бриф за 1 клик</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-32 w-full">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Как это работает</h2>
            <p className="mt-4 text-zinc-400">Простой процесс от заявки до сделки</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative rounded-2xl border border-zinc-700/50 bg-zinc-800/30 p-8 backdrop-blur-sm transition hover:border-amber-500/30 hover:bg-zinc-800/50">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Клиент заполняет форму</h3>
              <p className="mt-3 text-zinc-400">
                Простая форма на сайте — клиент оставляет контакты и критерии поиска
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-2xl border border-zinc-700/50 bg-zinc-800/30 p-8 backdrop-blur-sm transition hover:border-amber-500/30 hover:bg-zinc-800/50">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Мгновенное уведомление</h3>
              <p className="mt-3 text-zinc-400">
                Telegram-бот присылает заявку сразу после отправки формы
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-2xl border border-zinc-700/50 bg-zinc-800/30 p-8 backdrop-blur-sm transition hover:border-amber-500/30 hover:bg-zinc-800/50">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Готовый бриф в PDF</h3>
              <p className="mt-3 text-zinc-400">
                Скачайте PDF-бриф в один клик для быстрого созвона с клиентом
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="mt-32 w-full">
            <div className="relative overflow-hidden rounded-3xl border border-zinc-700/50 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-12 backdrop-blur-sm md:p-16">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
              
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Готовы увеличить конверсию?
                </h2>
                <p className="mt-4 text-lg text-zinc-400">
                  Начните использовать Decor CRM уже сегодня и получайте больше заявок
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105"
                    href="/register"
                  >
                    Начать бесплатно
                  </a>
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800/50 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-zinc-700/50 hover:scale-105"
                    href="/docs"
                  >
                    Документация
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-32 w-full border-t border-zinc-700/50 py-8 text-center text-sm text-zinc-500">
          <p>© 2026 Decor CRM. Все права защищены.</p>
        </footer>
      </main>
    </div>
  );
}
