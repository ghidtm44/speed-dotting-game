import { supabase } from '../supabase';
import { Score } from '../../types/game';
import { SUPABASE_CONFIG } from '../constants';

export const scoreService = {
  async saveScore(playerName: string, score: number): Promise<void> {
    if (!playerName || score === undefined) {
      console.error('Invalid score data:', { playerName, score });
      throw new Error('Player name and score are required');
    }

    try {
      console.log('Saving score:', { playerName, score });
      const { error } = await supabase
        .from(SUPABASE_CONFIG.TABLE)
        .insert([{
          player_name: playerName,
          score: score,
          updated_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('Error saving score:', error);
        throw error;
      }
      
      console.log('Score saved successfully');
    } catch (error) {
      console.error('Error in saveScore:', error);
      throw error;
    }
  },

  async getTopScores(): Promise<Score[]> {
    try {
      const { data, error } = await supabase
        .from(SUPABASE_CONFIG.TABLE)
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching scores:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getTopScores:', error);
      throw error;
    }
  },

  subscribeToScores(callback: () => void) {
    const channel = supabase
      .channel('scores')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: SUPABASE_CONFIG.SCHEMA, 
          table: SUPABASE_CONFIG.TABLE 
        }, 
        (payload) => {
          console.log('Score change detected:', payload);
          callback();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return channel;
  }
};