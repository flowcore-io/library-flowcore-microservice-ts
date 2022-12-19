import { WinstonModule } from "nest-winston";
import { LoggerTransportFactory } from "./logger-transport.factory";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSimpleLogger = (configuration: any) => {
  return WinstonModule.createLogger({
    transports: [
      configuration?.logger?.pretty
        ? LoggerTransportFactory.prettyFormat()
        : LoggerTransportFactory.jsonFormat(),
    ],
  });
};
