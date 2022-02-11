import { Match } from '@entities/match';
import { getMock } from '@test/test-helpers/get-mock';
import { MatchRepository } from '@use-cases/common-dependencies/match-repository.interface';
import { CreateMatchUseCase } from '@use-cases/create-match';
import { MatchCodeGenerator } from '@use-cases/create-match/match-code-generator.interface';
import { CreateMatchResponse } from '@use-cases/create-match/response';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
jest.mock('@entities/match');

describe('Create room use case tests', () => {
  const matchManager = getMock<MatchRepository>(['store']);
  const codeGenerator = getMock<MatchCodeGenerator>(['generateCode']);
  const presenter = getMock<UseCaseOutputPort<CreateMatchResponse>>([
    'failure',
    'success',
  ]);
  const sut = new CreateMatchUseCase({
    matchManager,
    codeGenerator,
    presenter,
  });

  it('should generate a match code.', async () => {
    await sut.execute();
    expect(codeGenerator.generateCode).toBeCalled();
  });

  it('should create the match.', async () => {
    const matchCode = 'some-match-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(matchCode);
    await sut.execute();
    expect(Match).toBeCalledWith(matchCode);
  });

  it('should store the match.', async () => {
    const matchCode = 'some-match-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(matchCode);
    await sut.execute();
    expect(matchManager.store).toBeCalled();
  });

  it('should return the match code.', async () => {
    const matchCode = 'some-match-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(matchCode);
    await sut.execute();
    const response: CreateMatchResponse = { matchCode };
    expect(presenter.success).toBeCalledWith(response);
  });
});
