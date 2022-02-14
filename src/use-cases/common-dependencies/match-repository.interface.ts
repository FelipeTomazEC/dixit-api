import { Match } from '@entities/match';

export interface MatchRepository {
  store(match: Match): Promise<void>;
  load(id: string): Promise<Match | undefined>;
  update(match: Match): Promise<void>;
}
