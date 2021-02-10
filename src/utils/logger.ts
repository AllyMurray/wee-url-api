/* eslint-disable @typescript-eslint/ban-types */
import pino from 'pino';

const pinoLog = pino();

class Logger {
  info(message: string): void;
  info(mergingObject: Object, message: string): void;
  info(x: never, message?: string): void {
    pinoLog.info(x, message);
  }

  warn(message: string): void;
  warn(mergingObject: Object, message: string): void;
  warn(x: never, message?: string): void {
    pinoLog.warn(x, message);
  }

  error(message: string): void;
  error(mergingObject: Object, message: string): void;
  error(x: never, message?: string): void {
    pinoLog.error(x, message);
  }

  debug(message: string): void;
  debug(mergingObject: Object, message: string): void;
  debug(x: never, message?: string): void {
    pinoLog.debug(x, message);
  }
}

export const logger = new Logger();
