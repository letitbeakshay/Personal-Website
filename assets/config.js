/* Public settings. Safe to commit: the publishable key only allows what Row Level Security allows.
   ADMIN_EMAIL is the email of the one admin user you create in Supabase (Authentication, Users).
   It is not a secret. The password is never stored here. */
window.CONFIG = {
  SUPABASE_URL: "https://lfrruybrnycexlavpofx.supabase.co",
  SUPABASE_KEY: "sb_publishable_gKgQoz4ysK9ORXq6SuGhQQ_NI7sfTI1",
  ADMIN_EMAIL: "toakshayskumar@gmail.com",
  // Bible app login: the security code you type is combined with this fixed padding, because Supabase
  // rejects passwords under 6 characters. The padding is public, so the code itself is the only secret.
  BIBLE_EMAIL: "bible@akshayland.vercel.app",
  BIBLE_PAD: "Qg7NQFpZjsVgBdH4o993ofdmbP0Ezp1N"
};
