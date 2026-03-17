"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInError) {
        throw signInError;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Не удалось войти. Проверьте email и пароль"
      );
    }
  }

  async function handleMagicLink(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: magicLinkError } = await supabase.auth.signInWithOtp({
        email: form.email,
      });

      if (magicLinkError) {
        throw magicLinkError;
      }

      alert("Мы отправили ссылку для входа на ваш email");
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Не удалось отправить ссылку"
      );
    }
  }

  async function handleGoogleSignIn() {
    setStatus("loading");
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (googleError) {
        throw googleError;
      }
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Не удалось войти через Google"
      );
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Вход в кабинет</h1>
          <p className="text-sm text-zinc-600">
            Войдите для доступа к заявкам
          </p>
        </header>

        <button
          onClick={handleGoogleSignIn}
          className="inline-flex h-11 items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
          type="button"
          disabled={status === "loading"}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Продолжить с Google
        </button>

        <div className="text-center text-sm text-zinc-500">или</div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="agent@example.com"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Пароль
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </label>

          {error && (
            <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <button
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Вход..." : "Войти"}
          </button>
        </form>

        <form
          onSubmit={handleMagicLink}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email для magic-ссылки
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="agent@example.com"
              required
            />
          </label>

          <button
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
            type="submit"
            disabled={status === "loading"}
          >
            Отправить ссылку на email
          </button>
        </form>

        <div className="text-center text-sm text-zinc-600">
          Нет аккаунта?{" "}
          <a
            href="/register"
            className="font-semibold text-zinc-900 underline underline-offset-4"
          >
            Зарегистрироваться
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
