import { Match } from '@entities/match';
import { MatchRepository } from '@use-cases/common-dependencies/match-repository.interface';

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

  async load(id: string): Promise<Match | undefined> {
    return this.matches.find((m) => m.code === id);
  }

  async update(match: Match): Promise<void> {
    const matchIndex = this.matches.findIndex((m) => m.code === match.code);
    this.matches.splice(matchIndex, 1, match);
  }
}
