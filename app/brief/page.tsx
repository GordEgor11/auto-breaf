"use client";

import { useState } from "react";

type LeadFormState = {
  property_type: "apartment" | "house";
  district: string;
  budget_min: string;
  budget_max: string;
  timeline: string;
  mortgage: boolean;
  name: string;
  phone: string;
  email: string;
};

const initialState: LeadFormState = {
  property_type: "apartment",
  district: "",
  budget_min: "",
  budget_max: "",
  timeline: "",
  mortgage: false,
  name: "",
  phone: "",
  email: "",
};

export default function BriefPage() {
  const [form, setForm] = useState<LeadFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  function updateField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Не удалось отправить заявку.");
      }

      setStatus("success");
      setMessage(`Заявка отправлена. Номер: ${data.lead_id}`);
      setForm(initialState);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Что-то пошло не так.";
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Бриф заявки</h1>
          <p className="text-sm text-zinc-600">
            Заполните короткую форму, и агент получит уведомление.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <p className="text-xs text-zinc-500">
            Поля с * обязательны. Остальные можно оставить пустыми.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Тип объекта *
              <select
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                value={form.property_type}
                onChange={(event) =>
                  updateField(
                    "property_type",
                    event.target.value as LeadFormState["property_type"]
                  )
                }
              >
                <option value="apartment">Квартира</option>
                <option value="house">Дом</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Район
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="text"
                value={form.district}
                onChange={(event) => updateField("district", event.target.value)}
                placeholder="Например, Центральный"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Бюджет от, ₽
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="number"
                min="0"
                value={form.budget_min}
                onChange={(event) =>
                  updateField("budget_min", event.target.value)
                }
                placeholder="2 500 000"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Бюджет до, ₽
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="number"
                min="0"
                value={form.budget_max}
                onChange={(event) =>
                  updateField("budget_max", event.target.value)
                }
                placeholder="5 000 000"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Сроки покупки
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="text"
              value={form.timeline}
              onChange={(event) => updateField("timeline", event.target.value)}
              placeholder="В течение 1-2 месяцев"
            />
          </label>

          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              className="h-4 w-4 rounded border border-zinc-300"
              type="checkbox"
              checked={form.mortgage}
              onChange={(event) => updateField("mortgage", event.target.checked)}
            />
            Ипотека нужна
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Имя *
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="text"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Мария"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Телефон *
              <input
                className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="+7 999 123-45-67"
                required
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Email (опционально)
            <input
              className="h-11 rounded-xl border border-zinc-300 px-3 text-sm"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="client@example.com"
            />
          </label>

          <button
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Отправка..." : "Отправить бриф"}
          </button>

          {message ? (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {message}
            </div>
          ) : null}
        </form>

        <a
          className="text-sm font-semibold text-zinc-900 underline underline-offset-4"
          href="/"
        >
          Назад на лендинг
        </a>
      </main>
    </div>
  );
}
