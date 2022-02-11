import { Logger } from '@interface-adapters/controllers/interfaces/logger.interface';

export class ConsoleLogger implements Logger {
  async log(entry: any): Promise<void> {
    console.log(entry);
  }
}
