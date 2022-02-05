import { Player } from '@entities/player';
import { Room } from '@entities/room';
import { UseCaseInputPort } from '@use-cases/ports/usecase-input-port';
import { UseCaseOutputPort } from '@use-cases/ports/usecase-output-port';
import { CreateRoomRequest } from './request';
import { CreateRoomResponse } from './response';
import { RoomCodeGenerator } from './room-code-generator.interface';
import { RoomManager } from './room-manager.interface';

interface Dependencies {
  codeGenerator: RoomCodeGenerator;
  roomManager: RoomManager;
  presenter: UseCaseOutputPort<CreateRoomResponse>;
}

export class CreateRoomUseCase implements UseCaseInputPort<CreateRoomRequest> {
  constructor(private readonly dependencies: Dependencies) {}

  async execute(request: CreateRoomRequest): Promise<void> {
    const { creatorAvatar: avatar, creatorUsername: username } = request;
    const { codeGenerator, presenter, roomManager } = this.dependencies;
    const roomCode = await codeGenerator.generateCode();
    const room = new Room(roomCode);
    const roomCreatorOrError = Player.create({ avatar, username });
    if (roomCreatorOrError.isFailure()) {
      return presenter.failure(roomCreatorOrError.value);
    }
    const roomCreator = roomCreatorOrError.value;

    room.join(roomCreator);

    await roomManager.signRoom(room);

    return presenter.success({ roomCode });
  }
}
