import { Match } from '@entities/match';
import { getMock } from '@test/test-helpers/get-mock';
import { CreateMatchUseCase } from '@use-cases/create-match';
import { MatchCodeGenerator } from '@use-cases/create-match/match-code-generator.interface';
import { CreateMatchRequest } from '@use-cases/create-match/request';
import { CreateMatchResponse } from '@use-cases/create-match/response';
import { MatchManager } from '@use-cases/create-match/match-manager.interface';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import faker from 'faker';
jest.mock('@entities/match');

describe('Create room use case tests', () => {
  const codeGenerator = getMock<MatchCodeGenerator>(['generateCode']);
  const matchManager = getMock<MatchManager>(['signMatch']);
  const presenter = getMock<UseCaseOutputPort<CreateMatchResponse>>([
    'failure',
    'success',
  ]);
  const getFakeRequest = (): CreateMatchRequest => ({
    creatorAvatar: faker.internet.avatar(),
    creatorUsername: faker.internet.userName(),
  });
  const sut = new CreateMatchUseCase({
    codeGenerator,
    presenter,
    matchManager,
  });

  it('should generate a match code.', async () => {
    await sut.execute(getFakeRequest());
    expect(codeGenerator.generateCode).toBeCalled();
  });

  it('should create the match.', async () => {
    const matchCode = 'some-match-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(matchCode);
    await sut.execute(getFakeRequest());
    expect(Match).toBeCalledWith(matchCode);
  });

  it('should sign the match into the match manager.', async () => {
    await sut.execute(getFakeRequest());
    expect(matchManager.signMatch).toBeCalledTimes(1);
  });

  it('should return the match code.', async () => {
    const matchCode = 'some-match-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(matchCode);
    await sut.execute(getFakeRequest());
    const response: CreateMatchResponse = { matchCode };
    expect(presenter.success).toBeCalledWith(response);
  });
});
