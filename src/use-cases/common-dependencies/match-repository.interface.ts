import { Match } from '@entities/match';

export interface MatchRepository {
  store(match: Match): Promise<void>;
}
