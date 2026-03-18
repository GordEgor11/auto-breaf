export default function RegisterConfirmPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/25">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold">Подтвердите email</h1>
          <p className="text-sm text-slate-400">
            Мы отправили письмо со ссылкой для подтверждения на ваш email.
          </p>
        </header>

        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Проверьте почту</h3>
              <p className="mt-2 text-sm text-slate-300">
                Перейдите по ссылке из письма, чтобы активировать аккаунт. 
                После этого вы сможете войти в кабинет агента.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center text-sm text-slate-400">
          Уже подтвердили?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Войти
          </a>
        </div>

        <a
          href="/"
          className="text-center text-sm font-medium text-slate-400 transition hover:text-white"
        >
          ← На главную
        </a>
      </main>
    </div>
  );
}
