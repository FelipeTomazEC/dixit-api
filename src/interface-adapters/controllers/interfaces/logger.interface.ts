export interface Logger {
  log(entry: any): Promise<void>;
}
