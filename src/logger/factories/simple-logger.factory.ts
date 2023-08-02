import { WinstonModule } from "nest-winston";
import { LoggerTransportFactory } from "./logger-transport.factory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSimpleLogger = (configuration: any) => {
  return WinstonModule.createLogger({
    level: configuration?.logger?.level || "info",
    transports: [
      configuration?.logger?.pretty
        ? LoggerTransportFactory.prettyFormat()
        : LoggerTransportFactory.jsonFormat(),
    ],
  });
};
