"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    if (form.password !== form.confirmPassword) {
      setStatus("error");
      setError("Пароли не совпадают");
      return;
    }

    if (form.password.length < 6) {
      setStatus("error");
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      router.push("/register/confirm");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Не удалось зарегистрироваться"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold">Регистрация агента</h1>
          <p className="text-sm text-slate-400">
            Создайте аккаунт для доступа к кабинету агента
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Имя *
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Иван Петров"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Email *
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="agent@example.com"
              required
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Пароль *
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Подтверждение пароля *
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Компания
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Название компании"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Телефон
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+7 999 123-45-67"
            />
          </label>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-400">
          Уже есть аккаунт?{" "}
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
