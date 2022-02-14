import { Match } from '@entities/match';
import { Player } from '@entities/player';

export interface Notifier {
  playerJoinedMatch(player: Player, match: Match): void;
}
