import { Provider } from "@nestjs/common";
import { LOGGER_SERVICE } from "./constants";
import { LoggerService } from "./logger/logger.service";
import { loggerContexts } from "./decorator/logger.decorator";

function loggerFactory(logger: LoggerService, context: string) {
  if (context) {
    logger.setContext(context);
  }

  return logger;
}

function createLoggerProvider(context: string): Provider<LoggerService> {
  return {
    provide: `${LOGGER_SERVICE}${context}`,
    useFactory: (logger) => loggerFactory(logger, context),
    inject: [LoggerService],
  };
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return loggerContexts.map((context) => createLoggerProvider(context));
}
