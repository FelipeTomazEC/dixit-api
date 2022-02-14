import { Player } from './player';

export class Match {
  private readonly players: Player[];

  constructor(readonly code: string) {
    this.players = [];
  }

  join(player: Player): void {
    this.players.push(player);
  }

  getPlayers(): Player[] {
    return [...this.players];
  }
}
