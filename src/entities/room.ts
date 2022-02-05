import { Player } from './player';

export class Room {
  private readonly players: Player[];

  constructor(readonly code: string) {
    this.players = [];
  }

  join(player: Player): void {
    this.players.push(player);
  }
}
