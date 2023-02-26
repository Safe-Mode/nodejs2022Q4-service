import { ConsoleLogger } from '@nestjs/common';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { env } from 'node:process';
import { DEFAULT_LOG_LEVEL, LOG_LEVELS, MAX_LOG_LEVEL } from 'src/app.const';

export class LoggingService extends ConsoleLogger {
  constructor(context?: string) {
    super(context);
    
    this.setLogLevels(
      LoggingService.getLogLevel((env.LOG_LEVEL ?? DEFAULT_LOG_LEVEL) as string)
    );
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    super.log(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    super.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    super.warn(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message);
  }

  static objectToString(object: unknown): string {
    return Object.keys(object).reduce(
        (result, param, index) =>
            `${result}${param}: ${object[param]}${Object.keys(object).length - 1 === index ? ' }' : ', '}`,
        '{ '
    );
  }

  static getLogLevel(level: string): LogLevel[] {
    if (+level > MAX_LOG_LEVEL) {
      throw new Error('Invalid log level argument');
    }

    return LOG_LEVELS.slice(0, +level);
  }
}