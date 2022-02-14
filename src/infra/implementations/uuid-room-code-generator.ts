import { MatchCodeGenerator } from '@use-cases/create-match/match-code-generator.interface';
import { v4 as uuidV4 } from 'uuid';

export class UUIDRoomCodeGenerator implements MatchCodeGenerator {
  async generateCode(): Promise<string> {
    return uuidV4().substring(0, 7);
  }
}
