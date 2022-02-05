export interface RoomCodeGenerator {
  generateCode(): Promise<string>;
}
