import { Match } from '@entities/match';

export interface MatchManager {
  signMatch(match: Match): Promise<void>;
}
