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

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Email:", form.email);

    try {
      const supabase = createSupabaseBrowserClient();
      
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      console.log("=== SIGN IN RESULT ===");
      console.log("User:", data?.user?.email || "none");
      console.log("Session:", data?.session ? "exists" : "none");
      console.log("Error:", signInError?.message || "none");
      console.log("Cookies after sign in:", document.cookie.substring(0, 100));

      if (signInError || !data.user || !data.session) {
        console.error("Login failed:", signInError?.message || "No user/session");
        setStatus("error");
        setError(signInError?.message || "Ошибка входа: нет сессии");
        return;
      }

      console.log("Redirecting to dashboard...");
      
      // Проверка через 100мс
      setTimeout(() => {
        console.log("Cookies before redirect:", document.cookie.substring(0, 100));
      }, 100);
      
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setStatus("error");
      setError(err instanceof Error ? err.message : "Не удалось войти");
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
          <h1 className="text-3xl font-semibold">Вход в кабинет</h1>
          <p className="text-sm text-slate-400">
            Войдите для доступа к заявкам
          </p>
        </header>

        <button
          onClick={handleGoogleSignIn}
          className="inline-flex h-11 items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
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

        <div className="relative flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="text-sm text-slate-400">или</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
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
            Пароль
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
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
            {status === "loading" ? "Вход..." : "Войти"}
          </button>
        </form>

        <form
          onSubmit={handleMagicLink}
          className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm"
        >
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email для magic-ссылки
            <input
              className="h-11 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="agent@example.com"
              required
            />
          </label>

          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:scale-105"
            type="submit"
            disabled={status === "loading"}
          >
            Отправить ссылку на email
          </button>
        </form>

        <div className="text-center text-sm text-slate-400">
          Нет аккаунта?{" "}
          <a
            href="/register"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Зарегистрироваться
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
