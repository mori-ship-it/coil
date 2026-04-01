-- スタイリストプロフィールテーブル
CREATE TABLE IF NOT EXISTS stylist_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 基本情報
  name_kanji TEXT NOT NULL,
  name_kana TEXT NOT NULL,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('男性', '女性', 'その他')),
  phone TEXT,
  email TEXT NOT NULL,

  -- 最寄り駅（オートコンプリートで選択）
  nearest_station TEXT,        -- 駅名（例：渋谷）
  nearest_line TEXT,           -- 路線名（例：JR山手線）
  nearest_prefecture TEXT,     -- 都道府県（例：東京都）
  nearest_city TEXT,           -- 市区町村（例：渋谷区）

  -- 経歴・スキル
  has_license BOOLEAN DEFAULT true,
  experience_years TEXT CHECK (experience_years IN ('未経験', '1年未満', '1〜3年', '3〜5年', '5〜10年', '10年以上')),
  role_experience TEXT CHECK (role_experience IN ('アシスタント', 'スタイリスト', '店長 / マネージャー', 'フリーランス')),
  recent_salon TEXT,
  skills TEXT[] DEFAULT '{}',  -- 選択式タグ（配列）
  skills_other TEXT,           -- その他自由記述

  -- 希望条件
  preferred_prefecture TEXT,
  preferred_city TEXT,
  preferred_employment TEXT[] DEFAULT '{}',  -- 複数選択（正社員、業務委託、パート・アルバイト、トライアル）
  preferred_salary_min INTEGER,              -- 希望月給下限（円）
  available_from TEXT CHECK (available_from IN ('即日', '1ヶ月以内', '3ヶ月以内', '相談')),

  -- 自己PR
  self_introduction TEXT,

  -- 施術例写真（Supabase StorageのURL配列、最大5枚）
  portfolio_photos TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLSポリシー
ALTER TABLE stylist_profiles ENABLE ROW LEVEL SECURITY;

-- 本人のみ読み書き可能
CREATE POLICY "Users can view own profile"
  ON stylist_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON stylist_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON stylist_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- サロン側（role=salon or admin）は全スタイリスト閲覧可
CREATE POLICY "Salons can view all profiles"
  ON stylist_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid()
      AND u.raw_user_meta_data->>'role' IN ('salon', 'admin')
    )
  );

-- updated_at自動更新
CREATE OR REPLACE FUNCTION update_stylist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER stylist_profiles_updated_at
  BEFORE UPDATE ON stylist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_stylist_updated_at();

-- Supabase Storageバケット作成（stylist-photos）
-- ※ ダッシュボードのStorageセクションで「stylist-photos」バケットを作成し、
--   Public accessを有効にしてください。
-- または以下のSQLをSQL Editorで実行：
INSERT INTO storage.buckets (id, name, public)
VALUES ('stylist-photos', 'stylist-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storageポリシー：認証ユーザーはアップロード可能
CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'stylist-photos'
    AND auth.role() = 'authenticated'
  );

-- Storageポリシー：誰でも閲覧可能（publicバケット）
CREATE POLICY "Public can view stylist photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'stylist-photos');

-- Storageポリシー：本人のみ削除可能
CREATE POLICY "Users can delete own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'stylist-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
