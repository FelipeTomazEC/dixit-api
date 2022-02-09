import { Player } from '@entities/player';
import { Match } from '@entities/match';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { CreateMatchRequest } from './request';
import { CreateMatchResponse } from './response';
import { MatchCodeGenerator } from './match-code-generator.interface';
import { MatchManager } from './match-manager.interface';

interface Dependencies {
  codeGenerator: MatchCodeGenerator;
  matchManager: MatchManager;
  presenter: UseCaseOutputPort<CreateMatchResponse>;
}

export class CreateMatchUseCase
  implements UseCaseInputPort<CreateMatchRequest>
{
  constructor(private readonly dependencies: Dependencies) {}

  async execute(request: CreateMatchRequest): Promise<void> {
    const { creatorAvatar: avatar, creatorUsername: username } = request;
    const { codeGenerator, presenter, matchManager } = this.dependencies;
    const matchCode = await codeGenerator.generateCode();
    const match = new Match(matchCode);
    const matchCreatorOrError = Player.create({ avatar, username });
    if (matchCreatorOrError.isFailure()) {
      return presenter.failure(matchCreatorOrError.value);
    }
    const matchCreator = matchCreatorOrError.value;

    match.join(matchCreator);

    await matchManager.signMatch(match);

    return presenter.success({ matchCode });
  }
}
