import { Room } from '@entities/room';
import { getMock } from '@test/test-helpers/get-mock';
import { CreateRoomUseCase } from '@use-cases/create-room';
import { CreateRoomRequest } from '@use-cases/create-room/request';
import { CreateRoomResponse } from '@use-cases/create-room/response';
import { RoomCodeGenerator } from '@use-cases/create-room/room-code-generator.interface';
import { RoomManager } from '@use-cases/create-room/room-manager.interface';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import faker from 'faker';
jest.mock('@entities/room');

describe('Create room use case tests', () => {
  const codeGenerator = getMock<RoomCodeGenerator>(['generateCode']);
  const roomManager = getMock<RoomManager>(['signRoom']);
  const presenter = getMock<UseCaseOutputPort<CreateRoomResponse>>([
    'failure',
    'success',
  ]);
  const getFakeRequest = (): CreateRoomRequest => ({
    creatorAvatar: faker.internet.avatar(),
    creatorUsername: faker.internet.userName(),
  });
  const sut = new CreateRoomUseCase({ codeGenerator, presenter, roomManager });

  it('should generate a room code.', async () => {
    await sut.execute(getFakeRequest());
    expect(codeGenerator.generateCode).toBeCalled();
  });

  it('should create the room.', async () => {
    const roomCode = 'some-room-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(roomCode);
    await sut.execute(getFakeRequest());
    expect(Room).toBeCalledWith(roomCode);
  });

  it('should sign the room into the room manager.', async () => {
    await sut.execute(getFakeRequest());
    expect(roomManager.signRoom).toBeCalledTimes(1);
  });

  it('should return the room code.', async () => {
    const roomCode = 'some-room-code';
    jest.spyOn(codeGenerator, 'generateCode').mockResolvedValueOnce(roomCode);
    await sut.execute(getFakeRequest());
    const response: CreateRoomResponse = { roomCode };
    expect(presenter.success).toBeCalledWith(response);
  });
});
