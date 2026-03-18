import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Pattern - Modern Architecture */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Building Silhouettes - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#building-gradient)"
              fillOpacity="0.15"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <defs>
              <linearGradient id="building-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Abstract Building Blocks */}
        <div className="absolute bottom-0 left-20 w-24 h-64 bg-gradient-to-t from-blue-900/20 to-transparent rounded-t-2xl" />
        <div className="absolute bottom-0 left-52 w-20 h-48 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-t-2xl" />
        <div className="absolute bottom-0 right-20 w-28 h-72 bg-gradient-to-t from-blue-900/20 to-transparent rounded-t-2xl" />
        <div className="absolute bottom-0 right-56 w-16 h-56 bg-gradient-to-t from-indigo-900/20 to-transparent rounded-t-2xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
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
                  className="hidden text-sm font-medium text-slate-300 transition hover:text-white md:block"
                  href="/dashboard"
                >
                  Кабинет
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                  href="/dashboard"
                >
                  Мои заявки
                </a>
              </>
            ) : (
              <>
                <a
                  className="hidden text-sm font-medium text-slate-300 transition hover:text-white md:block"
                  href="/login"
                >
                  Войти
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
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
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Для агентств недвижимости нового поколения
          </div>

          {/* Headline - Value Proposition */}
          <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Превращаем посетителей
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              в горячих клиентов
            </span>
          </h1>

          {/* Subheadline - Value Focus */}
          <p className="mb-12 text-lg text-slate-400 md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ваша заявка — наш готовый бриф. 
            <span className="text-slate-300 font-medium"> Экономьте 3 часа на каждом клиенте</span>, 
            получайте структурированные данные и закрывайте сделки быстрее конкурентов.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                href="/dashboard"
              >
                Перейти в кабинет
              </a>
            ) : (
              <>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                  href="/register"
                >
                  Попробовать бесплатно
                </a>
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-slate-700/50 hover:scale-105"
                  href="#how-it-works"
                >
                  Как это работает
                </a>
              </>
            )}
          </div>

          {/* Value Stats */}
          <div className="mb-20 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-400">+40%</div>
              <div className="mt-2 text-sm text-slate-400">Конверсия в заявку</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-indigo-400">3 часа</div>
              <div className="mt-2 text-sm text-slate-400">Экономии на клиенте</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-400">0%</div>
              <div className="mt-2 text-sm text-slate-400">Потерь данных</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="mt-2 text-sm text-slate-400">Приём заявок</div>
            </div>
          </div>
        </div>

        {/* Pain Points Section */}
        <section className="mb-32 w-full">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Знакомые ситуации?</h2>
              <p className="mt-4 text-slate-400">Если хоть один пункт про вас — пора менять подход</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Pain Point 1 */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Клиенты уходят к конкурентам</h3>
                <p className="mt-3 text-sm text-slate-400">
                  Пока вы перезваниваете через час, клиент уже работает с другим агентом
                </p>
              </div>

              {/* Pain Point 2 */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Тратите часы на сбор информации</h3>
                <p className="mt-3 text-sm text-slate-400">
                  Десятки звонков, чтобы понять, что нужно клиенту на самом деле
                </p>
              </div>

              {/* Pain Point 3 */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                  <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">Забываете детали и упускаете важное</h3>
                <p className="mt-3 text-sm text-slate-400">
                  Бумажные заметки теряются, информация забывается между звонками
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - How It Works */}
        <section id="how-it-works" className="mb-32 w-full">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Как Decor CRM решает эти проблемы</h2>
              <p className="mt-4 text-slate-400">Автоматизируйте рутину — фокусируйтесь на сделках</p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-500/50 md:block" />

              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <div className="flex-1 text-center md:text-right md:pr-12">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white">Клиент заполняет форму на сайте</h3>
                      <p className="mt-3 text-slate-400">
                        Простая форма из 8 полей — клиент оставляет контакты, бюджет, предпочтения. 
                        Занимает 2 минуты.
                      </p>
                    </div>
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12">
                  <div className="hidden flex-1 md:block" />
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <div className="flex-1 text-center md:pl-12">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white">Вы получаете уведомление в Telegram</h3>
                      <p className="mt-3 text-slate-400">
                        Мгновенное уведомление с краткой информацией. 
                        Перезваниваете клиенту в течение 5 минут — пока он ещё на сайте.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center gap-6 md:flex-row md:gap-12">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <div className="flex-1 text-center md:text-right md:pr-12">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white">Скачиваете готовый PDF-бриф</h3>
                      <p className="mt-3 text-slate-400">
                        Все данные клиента в одном документе. 
                        Открываете на созвоне — ничего не спрашиваете повторно.
                      </p>
                    </div>
                  </div>
                  <div className="hidden flex-1 md:block" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-32 w-full">
          <div className="mx-auto max-w-5xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Что вы получаете</h2>
              <p className="mt-4 text-slate-400">Преимущества работы с Decor CRM</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Benefit 1 */}
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
                  <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Мгновенная реакция</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Уведомление сразу после отправки формы. Перезваниваете клиенту, 
                    пока он ещё на сайте — конверсия выше в 3 раза.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20">
                  <svg className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Структурированные данные</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Никаких «ну я примерно хочу...». Клиент сразу указывает бюджет, 
                    район, сроки — вы экономите часы на уточнениях.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
                  <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Профессиональный бриф</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    PDF-документ для быстрого созвона. Выглядите профессионально, 
                    клиент видит — вы подготовились.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/20">
                  <svg className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Безопасность данных</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Каждый агент видит только свои заявки. Данные зашифрованы, 
                    доступ по паролю или Google-аккаунту.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!user && (
          <section className="mb-20 w-full">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30 p-12 backdrop-blur-sm md:p-16">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
              
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Готовы увеличить конверсию в заявки?
                </h2>
                <p className="mt-4 text-lg text-slate-300">
                  Начните использовать Decor CRM сегодня — первые 14 дней бесплатно
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                    href="/register"
                  >
                    Начать бесплатно
                  </a>
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-600 bg-slate-800/50 px-8 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-slate-700/50 hover:scale-105"
                    href="/pricing"
                  >
                    Смотреть тарифы
                  </a>
                </div>
                <p className="mt-6 text-sm text-slate-400">
                  Не требуется банковская карта • Настройка за 15 минут
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="w-full border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>© 2026 Decor CRM. Все права защищены.</p>
        </footer>
      </main>
    </div>
  );
}
