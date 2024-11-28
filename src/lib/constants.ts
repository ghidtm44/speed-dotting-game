export const GAME_CONFIG = {
  INITIAL_TIME: 10,
  MAX_TIME: 30,
  TIME_BONUS: 0.25,
  TIME_PENALTY: 1,
  MIN_TIME: 0
} as const;

export const SUPABASE_CONFIG = {
  URL: 'https://budvsytnptnvxzwecsat.supabase.co',
  TABLE: 'scores',
  SCHEMA: 'public'
} as const;