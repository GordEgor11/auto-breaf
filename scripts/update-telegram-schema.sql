-- Обновление схемы: добавляем поля для Telegram
-- Выполните этот SQL в Supabase SQL Editor

-- Добавляем поля в таблицу profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS telegram_chat_id text,
ADD COLUMN IF NOT EXISTS telegram_bot_token text;

-- Создаём индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS profiles_telegram_chat_id_idx ON public.profiles (telegram_chat_id);

-- Проверяем, что поля добавлены
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('telegram_chat_id', 'telegram_bot_token');
