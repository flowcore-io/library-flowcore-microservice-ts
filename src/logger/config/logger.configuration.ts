import { z } from "zod";
import { ConfigurationSchema, safeBoolean } from "../../config";

export enum LogLevel {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

export const LoggerModuleConfigurationShape = z.object({
  logger: z.object({
    level: z.nativeEnum(LogLevel),
    pretty: safeBoolean(false),
    useLabels: safeBoolean(false),
  }),
});
export type LoggerModuleConfiguration = z.infer<
  typeof LoggerModuleConfigurationShape
>;

export class LoggerModuleConfigurationSchema extends ConfigurationSchema {
  context = "logger";
  linking = {
    logger: {
      level: {
        env: "LOG_LEVEL",
        default: LogLevel.INFO,
      },
      pretty: {
        env: "LOG_PRETTY_PRINT",
      },
      useLabels: {
        env: "LOG_LEVEL_LABELS",
      },
    },
  };
  shape = LoggerModuleConfigurationShape;
}
