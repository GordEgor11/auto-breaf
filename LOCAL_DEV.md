# Локальная разработка — email и уведомления

## Проблема

На localhost email уведомления не приходят, потому что:
- Supabase Cloud требует настроенный SMTP для отправки email
- Без SMTP письма не отправляются (подтверждение регистрации, magic link, уведомления)

## Решения

### ✅ Вариант 1: Отключить подтверждение email (рекомендуется для разработки)

В Supabase Dashboard:
1. **Authentication** → **Settings**
2. **Email Auth**
3. **Отключите** "Confirm email"
4. Сохраните

**Результат:** Пользователи регистрируются и входят сразу, без подтверждения.

---

### ✅ Вариант 2: Использовать Mailtrap для тестирования email

[Mailtrap](https://mailtrap.io/) — сервис для перехвата тестовых email.

#### Настройка:

1. Зарегистрируйтесь на mailtrap.io (бесплатно)
2. Создайте Inbox → получите SMTP credentials
3. В Supabase Dashboard:
   - **Project Settings** → **Auth** → **SMTP Settings**
   - Введите данные от Mailtrap:
     ```
     Host: smtp.mailtrap.io
     Port: 587
     Username: ваш_username
     Password: ваш_password
     Sender email: no-reply@yourdomain.com
     ```
4. Сохраните

**Результат:** Все письма будут приходить в inbox на mailtrap.io

---

### ✅ Вариант 3: Использовать Google OAuth (без email)

Вход через Google не требует отправки email для аутентификации.

#### Настройка:
1. Включите Google OAuth в Supabase (см. [AUTH_SETUP.md](./AUTH_SETUP.md))
2. На локальном хосте просто нажимайте "Продолжить с Google"

**Результат:** Вход работает без email уведомлений.

---

### ✅ Вариант 4: Локальный Supabase (продвинутый)

Запустите Supabase локально через Docker:

```bash
# Установите Supabase CLI
npm install -g supabase

# Инициализируйте проект
supabase init

# Запустите локально
supabase start
```

Email будут логироваться в консоль.

**Минусы:**
- Требует Docker и больше ресурсов
- Нужно применять миграции вручную

---

## Рекомендации для разработки

| Задача | Решение |
|--------|---------|
| Быстрая разработка | Отключить подтверждение email |
| Тестирование email | Mailtrap |
| Вход без пароля | Google OAuth |
| Полная локальная среда | Supabase Local + Mailtrap |

---

## Проверка работы email

После настройки проверьте:

1. **Регистрация:**
   - Перейдите на `/register`
   - Заполните форму
   - Проверьте email (или Mailtrap)

2. **Magic Link:**
   - Перейдите на `/login`
   - Введите email
   - Нажмите "Отправить ссылку на email"
   - Проверьте email

3. **Сброс пароля:**
   - В Supabase Dashboard: Authentication → Users
   - Нажмите "Reset password" для пользователя
   - Проверьте email

---

## Telegram уведомления

Telegram уведомления работают на localhost без дополнительной настройки:

```env
TELEGRAM_BOT_TOKEN=1234567890:AABBccDDeeFFggHHiiJJkkLLmmNNooP
TELEGRAM_CHAT_ID=-1001234567890
```

Получите токен через [@BotFather](https://t.me/BotFather)
Узнайте Chat ID через [@userinfobot](https://t.me/userinfobot)
