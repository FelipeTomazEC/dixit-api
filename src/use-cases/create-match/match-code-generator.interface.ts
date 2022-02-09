export interface MatchCodeGenerator {
  generateCode(): Promise<string>;
}
