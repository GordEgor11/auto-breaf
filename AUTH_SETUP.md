# Настройка аутентификации в decor_crm

## 1. Настройка Supabase

### 1.1. Создайте проект в Supabase
1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Дождитесь завершения развертывания

### 1.2. Примените схему БД
1. В панели Supabase перейдите в **SQL Editor**
2. Скопируйте содержимое файла `supabase/schema.sql`
3. Выполните SQL-скрипт

### 1.3. Настройте аутентификацию
1. Перейдите в **Authentication** → **Providers**
2. Убедитесь, что **Email** включен
3. При необходимости настройте подтверждение email (можно отключить для тестирования)

### 1.4. Вход через Google (OAuth)
1. Перейдите в **Authentication** → **Providers** → **Google**
2. Включите переключатель **Enable Sign in with Google**
3. Получите credentials в [Google Cloud Console](https://console.cloud.google.com/):
   - Создайте новый проект или выберите существующий
   - Включите **Google+ API**
   - Перейдите в **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
   - Тип приложения: **Web application**
   - Authorized redirect URIs добавьте:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
   - Скопируйте **Client ID** и **Client Secret**
4. Вставьте Client ID и Client Secret в настройках Supabase
5. Нажмите **Save**

### 1.5. Получите ключи API
1. Перейдите в **Settings** → **API**
2. Скопируйте:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Настройка проекта

### 2.1. Создайте файл .env.local
```bash
cp .env.example .env.local
```

### 2.2. Заполните переменные окружения
```env
NEXT_PUBLIC_SUPABASE_URL=ваш_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_anon_key
SUPABASE_SERVICE_ROLE_KEY=ваш_service_role_key

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=ваш_токен
TELEGRAM_CHAT_ID=id_чата
```

### 2.3. Установите зависимости
```bash
npm install
```

### 2.4. Запустите разработку
```bash
npm run dev
```

## 3. Как это работает

### Регистрация
1. Пользователь переходит на `/register`
2. Заполняет форму (имя, email, пароль)
3. Получает письмо с подтверждением (если включено)
4. После подтверждения перенаправляется на `/login`

### Вход
1. Пользователь переходит на `/login`
2. Вводит email и пароль
3. Или запрашивает magic-ссылку
4. После входа перенаправляется на `/dashboard`

### Защита маршрутов
- `/dashboard` — доступен только авторизованным пользователям
- `/brief` — доступен только авторизованным пользователям
- `/login`, `/register` — перенаправляют в dashboard, если пользователь уже вошёл

### Изоляция данных
Каждый агент видит **только свои заявки** благодаря:
- RLS (Row Level Security) политикам в БД
- Использованию `auth.uid()` вместо общего `DEFAULT_AGENT_ID`

## 4. Дополнительные настройки

### Отключение подтверждения email
В панели Supabase:
1. **Authentication** → **Settings**
2. **Email Auth** → отключить **Confirm email**

### Настройка Telegram уведомлений
1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Добавьте бота в чат (или используйте личный)
4. Узнайте ID чата через бота [@userinfobot](https://t.me/userinfobot)
5. Заполните `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`

## 5. Решение проблем

### Ошибка "Missing NEXT_PUBLIC_SUPABASE_URL"
- Убедитесь, что `.env.local` существует и заполнен

### Пользователь не может войти
- Проверьте, подтверждён ли email (если включено подтверждение)
- Проверьте логи в Supabase **Authentication** → **Users**

### Заявки не сохраняются
- Проверьте RLS политики в Supabase **Authentication** → **Policies**
- Убедитесь, что пользователь авторизован

### Middleware не работает
- Очистите `.next` папку: `rm -rf .next`
- Перезапустите dev-сервер
