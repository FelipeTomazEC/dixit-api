import { Room } from '@entities/room';

export interface RoomManager {
  signRoom(room: Room): Promise<void>;
}
