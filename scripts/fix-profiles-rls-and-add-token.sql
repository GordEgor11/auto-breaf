-- Исправление RLS политик для profiles
-- Выполните этот SQL в Supabase SQL Editor

-- Сначала проверим текущие политики
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- Добавляем политику для UPDATE (если не существует)
DO $$ BEGIN
  DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
  
  CREATE POLICY "profiles_update_own"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());
END $$;

-- Добавляем политику для INSERT (если не существует)
DO $$ BEGIN
  DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
  
  CREATE POLICY "profiles_insert_own"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (id = auth.uid());
END $$;

-- Добавляем токен бота во все профили
UPDATE public.profiles 
SET telegram_bot_token = '8546580622:AAHLH6785Cg-h8TxKbdGK17S6LA2Gjr8Qns'
WHERE telegram_bot_token IS NULL;

-- Проверяем результат
SELECT 
  id, 
  email, 
  telegram_chat_id, 
  telegram_bot_token,
  CASE 
    WHEN telegram_bot_token IS NOT NULL THEN '✅'
    ELSE '❌'
  END as has_token
FROM public.profiles;
