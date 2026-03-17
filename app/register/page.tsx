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
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Регистрация агента</h1>
          <p className="text-sm text-zinc-600">
            Создайте аккаунт для доступа к кабинету агента
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Имя *
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
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
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
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
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
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
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
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
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Название компании"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Телефон
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+7 999 123-45-67"
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
            {status === "loading" ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="text-center text-sm text-zinc-600">
          Уже есть аккаунт?{" "}
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
