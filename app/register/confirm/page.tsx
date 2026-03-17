export default function RegisterConfirmPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Подтвердите email</h1>
          <p className="text-sm text-zinc-600">
            Мы отправили письмо со ссылкой для подтверждения на ваш email.
          </p>
        </header>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-700">
          <p>
            Перейдите по ссылке из письма, чтобы активировать аккаунт. После
            этого вы сможете войти в кабинет агента.
          </p>
        </section>

        <div className="text-center text-sm text-zinc-600">
          Уже подтвердили?{" "}
          <a
            href="/login"
            className="font-semibold text-zinc-900 underline underline-offset-4"
          >
            Войти
          </a>
        </div>

        <a
          href="/"
          className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
        >
          На главную
        </a>
      </main>
    </div>
  );
}
