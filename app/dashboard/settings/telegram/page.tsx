"use client";

import { useState, useEffect } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function TelegramSettingsPage() {
  const [chatId, setChatId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const botUsername = "Build_crm_bot"; // Ваш бот

  async function handleConnect() {
    setIsConnecting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Необходимо войти в систему");
      }

      // Открываем Telegram бота
      window.open(`https://t.me/${botUsername}`, "_blank");

      // Показываем инструкцию
      setSuccess(
        `1. Откройте бота @${botUsername}\n2. Нажмите кнопку "Запустить" (Start)\n3. Бот отправит вам ваш персональный Chat ID\n4. Скопируйте число и вставьте в поле ниже`
      );
      setIsConnecting(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка подключения");
      setIsConnecting(false);
    }
  }

  async function handleSaveChatId(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsConnecting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Необходимо войти в систему");
      }

      // Проверяем Chat ID
      if (!chatId.trim()) {
        throw new Error("Введите Chat ID");
      }

      // Сначала пробуем обновить
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ telegram_chat_id: chatId.trim() } as any)
        .eq("id", user.id);

      if (updateError) {
        // Если не удалось обновить, создаём новый профиль
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email || "",
            telegram_chat_id: chatId.trim(),
          } as any);

        if (insertError) {
          throw insertError;
        }
      }

      setIsConnected(true);
      setSuccess("Telegram успешно подключён!");
    } catch (err) {
      console.error("Save error:", err);
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleDisconnect() {
    setIsConnecting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("Необходимо войти в систему");
      }

      // Отключаем через REST API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({ telegram_chat_id: null }),
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка отключения Telegram");
      }

      setChatId("");
      setIsConnected(false);
      setSuccess("Telegram отключён");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отключения");
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    async function loadSettings() {
      const supabase = createSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Загружаем профиль через REST API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles?id=eq.${user.id}`,
        {
          headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const profiles = await response.json();
      const profile = profiles[0];

      if (profile?.telegram_chat_id) {
        setChatId(profile.telegram_chat_id);
        setIsConnected(true);
      }
    }

    loadSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-16">
        {/* Header */}
        <div className="flex items-center gap-4">
          <a
            href="/dashboard"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <div>
            <h1 className="text-2xl font-semibold">Настройка Telegram</h1>
            <p className="text-sm text-slate-400">
              Получайте уведомления о новых заявках
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/20">
              <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.88-2.11 5.88-2.53 2.78-1.17 3.35-1.37 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Telegram уведомления</h3>
              <p className="mt-2 text-sm text-slate-300">
                Подключите Telegram, чтобы получать мгновенные уведомления о новых заявках.
                Это займёт 2 минуты.
              </p>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        {isConnected ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-white">Telegram подключён</div>
                <div className="text-sm text-slate-400">Chat ID: {chatId}</div>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleDisconnect}
                disabled={isConnecting}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
              >
                Отключить
              </button>
              <button
                onClick={() => setIsConnected(false)}
                disabled={isConnecting}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 text-sm font-semibold text-white transition hover:scale-105 disabled:opacity-50"
              >
                Изменить Chat ID
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="font-semibold text-white">Подключение Telegram</h3>
            
            <div className="mt-4 space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                  1
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    Откройте нашего Telegram бота{" "}
                    <a
                      href={`https://t.me/${botUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 underline underline-offset-4 hover:text-blue-300"
                    >
                      @{botUsername}
                    </a>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                  2
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    Нажмите <strong>Start</strong> или отправьте команду <code className="bg-white/10 px-2 py-0.5 rounded">/start</code>
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                  3
                </div>
                <div>
                  <p className="text-sm text-slate-300">
                    Бот отправит вам ваш <strong>Chat ID</strong> (например: 123456789)
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-semibold text-blue-400">
                  4
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    Вставьте Chat ID в поле ниже
                  </p>
                  <form onSubmit={handleSaveChatId} className="mt-3 flex gap-3">
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                      placeholder="Например: 123456789"
                      className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-400 transition focus:border-blue-500 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      disabled={isConnecting || !chatId.trim()}
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isConnecting ? "Сохранение..." : "Сохранить"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {success && (
              <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>
        )}

        {/* Help Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h4 className="font-semibold text-white">Нужна помощь?</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">•</span>
              Chat ID обычно выглядит как число: 123456789
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">•</span>
              Убедитесь, что вы отправили /start боту
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-blue-400">•</span>
              Бот должен быть разблокирован (не в чёрном списке)
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
