import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://budvsytnptnvxzwecsat.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_KEY environment variable');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

export const db = {
  async saveScore(playerName: string, score: number) {
    try {
      // First, get the player's current high score
      const { data: existingScores } = await supabase
        .from('scores')
        .select('*')
        .eq('player_name', playerName)
        .single();

      if (existingScores) {
        // If the new score is higher, update the existing record
        if (score > existingScores.score) {
          const { error } = await supabase
            .from('scores')
            .update({ 
              score: score,
              created_at: new Date().toISOString()
            })
            .eq('player_name', playerName);

          if (error) throw error;
        }
      } else {
        // If no existing score, insert new record
        const { error } = await supabase
          .from('scores')
          .insert([
            {
              player_name: playerName,
              score: score,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;
      }
    } catch (error) {
      console.error('Error saving score:', error);
      throw error;
    }
  },

  async getTopScores() {
    try {
      const { data, error } = await supabase
        .from('scores')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching scores:', error);
      return [];
    }
  },

  subscribeToScores(callback: () => void) {
    return supabase
      .channel('scores')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'scores' },
        callback
      )
      .subscribe();
  }
}