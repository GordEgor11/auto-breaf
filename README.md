# decor_crm — CRM для агентств недвижимости

Система управления заявками на просмотр недвижимости с автоматической генерацией PDF-брифов.

## Возможности

- 📝 **Публичная форма** — клиенты оставляют заявки на просмотр
- 🔔 **Уведомления** — Telegram + email fallback
- 📄 **PDF-брифы** — генерация документов по запросу
- 👤 **Аутентификация** — регистрация и вход для агентов
- 🔒 **Изоляция данных** — каждый агент видит только свои заявки
- 📊 **Dashboard** — управление заявками, фильтры, экспорт CSV

## Быстрый старт

### 1. Клонирование и установка

```bash
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Выполните SQL-скрипт из `supabase/schema.sql` в SQL Editor
3. Получите ключи API в Settings → API

### 3. Настройка переменных окружения

Создайте `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=ваш_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_anon_key
SUPABASE_SERVICE_ROLE_KEY=ваш_service_role_key

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

### 4. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Структура приложения

| Страница | Описание |
|----------|----------|
| `/` | Лендинг с информацией |
| `/register` | Регистрация нового агента |
| `/login` | Вход в систему |
| `/brief` | Форма подачи заявки (требует входа) |
| `/dashboard` | Кабинет агента с заявками |
| `/pricing` | Тарифы |
| `/docs` | Документация |

## API Endpoints

- `POST /api/leads` — создание заявки
- `GET /api/leads/export` — экспорт в CSV
- `GET /api/leads/[id]/pdf` — генерация PDF
- `POST /api/lead-events` — отслеживание событий формы
- `POST /api/auth/logout` — выход из системы

## База данных

### Таблицы

- **profiles** — профили агентов (связаны с auth.users)
- **leads** — заявки клиентов
- **lead_events** — аналитика (просмотры, отправки форм)
- **lead_notes** — заметки к заявкам

### Безопасность

Все таблицы защищены Row Level Security (RLS):
- Агенты видят только свои данные
- Автоматическое создание профиля при регистрации
- Каскадное удаление при удалении пользователя

## Технологии

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Auth + RLS)
- **Генерация PDF:** Puppeteer + Chromium
- **Валидация:** Zod

## Настройка аутентификации

Подробная инструкция в [AUTH_SETUP.md](./AUTH_SETUP.md)

## Скрипты

```bash
npm run dev      # Запуск dev-сервера
npm run build    # Сборка продакшн версии
npm run start    # Запуск продакшн сервера
npm run lint     # ESLint проверка
npm run test:smoke # Smoke-тесты
```

## Развёртывание

### Vercel

```bash
vercel deploy
```

Не забудьте добавить переменные окружения в настройках проекта.

### Docker

```bash
docker build -t decor_crm .
docker run -p 3000:3000 --env-file .env.local decor_crm
```

## Лицензия

MIT
