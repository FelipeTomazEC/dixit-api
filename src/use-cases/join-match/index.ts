import { NotFoundError } from '@common/errors/not-found-error';
import { Player } from '@entities/player';
import { MatchRepository } from '@use-cases/common-dependencies/match-repository.interface';
import { Notifier } from '@use-cases/common-dependencies/notifier.interface';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { JoinMatchRequest } from './request';
import { JoinMatchResponse } from './response';

interface Dependencies {
  matchRepo: MatchRepository;
  notifier: Notifier;
  presenter: UseCaseOutputPort<JoinMatchResponse>;
}

export class JoinMatchUseCase implements UseCaseInputPort<JoinMatchRequest> {
  constructor(private readonly deps: Dependencies) {}

  async execute(request: JoinMatchRequest): Promise<void> {
    const { matchRepo, notifier, presenter } = this.deps;
    const { matchCode, avatar, username } = request;

    const match = await matchRepo.load(matchCode);
    if (!match) {
      return presenter.failure(new NotFoundError('match', matchCode));
    }

    const playerOrError = Player.create({ username, avatar });
    if (playerOrError.isFailure()) {
      return presenter.failure(playerOrError.value);
    }

    const player = playerOrError.value;
    const hasAlreadyJoined = match
      .getPlayers()
      .some((p) => p.username === username);
    if (!hasAlreadyJoined) {
      match.join(player);
      await matchRepo.update(match);
      notifier.playerJoinedMatch(player, match);
    }

    return presenter.success({
      matchPlayers: match.getPlayers().map((p) => ({
        username: p.username,
        avatar: p.avatar,
      })),
    });
  }
}
