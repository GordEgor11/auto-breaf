export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
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
          
          <a
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
            href="/"
          >
            ← На главную
          </a>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-20">
        {/* Header */}
        <header className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            Прозрачные тарифы без скрытых платежей
          </div>
          
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Выберите свой план
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Начните бесплатно — масштабируйтесь по мере роста. 
            <span className="text-slate-300 font-medium"> Никаких кредитных карт.</span>
          </p>
        </header>

        {/* Pricing Cards */}
        <section className="grid gap-8 md:grid-cols-3">
          {/* Start Plan */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Старт
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">0 ₽</span>
              <span className="text-sm text-slate-400">/ навсегда</span>
            </div>
            <p className="mb-6 text-sm text-slate-400">
              Для новых агентов. Протестируйте CRM в деле.
            </p>
            
            <a
              href="/register"
              className="mb-8 inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
            >
              Начать бесплатно
            </a>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1 агент
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                1 форма заявки
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Telegram уведомления
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                PDF-бриф
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                До 20 заявок/мес
              </div>
            </div>
          </div>

          {/* Pro Plan - Featured */}
          <div className="group relative rounded-3xl border border-blue-500/50 bg-gradient-to-b from-blue-900/30 to-indigo-900/30 p-8 backdrop-blur-sm shadow-2xl shadow-blue-500/20">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-500 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Популярный
              </div>
            </div>
            
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
              Профи
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">1 990 ₽</span>
              <span className="text-sm text-slate-400">/ месяц</span>
            </div>
            <p className="mb-6 text-sm text-slate-300">
              Для активных агентов. Увеличьте конверсию в 2 раза.
            </p>
            
            <a
              href="/register"
              className="mb-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              Попробовать 14 дней бесплатно
            </a>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Всё из тарифа Старт
              </div>
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                До 100 заявок/мес
              </div>
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Расширенные фильтры
              </div>
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Сегментация клиентов
              </div>
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Экспорт в CSV
              </div>
              <div className="flex items-start gap-3 text-sm text-white">
                <svg className="mt-0.5 h-5 w-5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Приоритетная поддержка
              </div>
            </div>
          </div>

          {/* Team Plan */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10">
            <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Команда
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">4 990 ₽</span>
              <span className="text-sm text-slate-400">/ месяц</span>
            </div>
            <p className="mb-6 text-sm text-slate-400">
              Для агентств и офисов продаж.
            </p>
            
            <a
              href="/register"
              className="mb-8 inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
            >
              Связаться с нами
            </a>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Всё из тарифа Профи
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Безлимитные заявки
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                До 10 агентов
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Роли и доступы
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Интеграции (API)
              </div>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <svg className="mt-0.5 h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Персональный менеджер
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Частые вопросы</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* FAQ Item 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-white">Можно ли перейти на другой тариф?</h3>
              <p className="mt-3 text-sm text-slate-400">
                Да, вы можете изменить тариф в любой момент. При переходе на старший тариф разница пересчитывается пропорционально.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-white">Есть ли пробный период?</h3>
              <p className="mt-3 text-sm text-slate-400">
                Да, 14 дней бесплатного доступа к тарифу Профи. Карта не требуется.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-white">Что если закончатся заявки?</h3>
              <p className="mt-3 text-sm text-slate-400">
                Лимит заявок сбрасывается каждый месяц. Если превысили лимит — форма продолжит работать, вы получите уведомление о необходимости апгрейда.
              </p>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-white">Можно ли отменить подписку?</h3>
              <p className="mt-3 text-sm text-slate-400">
                Да, в любой момент в личном кабинете. Доступ сохранится до конца оплаченного периода.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/30 via-indigo-900/30 to-purple-900/30 p-12 backdrop-blur-sm md:p-16">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Готовы начать?
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Создайте аккаунт за 2 минуты — первые 14 дней бесплатно
              </p>
              <div className="mt-8">
                <a
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                  href="/register"
                >
                  Попробовать бесплатно
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">
                Не требуется банковская карта • Настройка за 15 минут
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 py-8 text-center text-sm text-slate-500">
          <p>© 2026 Decor CRM. Все права защищены.</p>
        </footer>
      </main>
    </div>
  );
}
