import { Match } from '@entities/match';
import { MatchRepository } from '@use-cases/create-match/match-repository.interface';

export class InMemoryMatchRepository implements MatchRepository {
  private static instance: InMemoryMatchRepository | null = null;

  private readonly matches: Match[];

  private constructor() {
    this.matches = [];
  }

  static getInstance(): InMemoryMatchRepository {
    if (!this.instance) {
      this.instance = new InMemoryMatchRepository();
    }

    return this.instance;
  }

  async store(match: Match): Promise<void> {
    this.matches.push(match);
  }
}
