import { Match } from '@entities/match';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { CreateMatchResponse } from './response';
import { MatchCodeGenerator } from './match-code-generator.interface';
import { MatchRepository } from './match-repository.interface';

interface Dependencies {
  codeGenerator: MatchCodeGenerator;
  matchManager: MatchRepository;
  presenter: UseCaseOutputPort<CreateMatchResponse>;
}

export class CreateMatchUseCase implements UseCaseInputPort<void> {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(): Promise<void> {
    const { codeGenerator, presenter, matchManager } = this.dependencies;
    const matchCode = await codeGenerator.generateCode();
    const match = new Match(matchCode);
    await matchManager.store(match);

    return presenter.success({ matchCode });
  }
}
