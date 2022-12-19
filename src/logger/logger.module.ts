import { DynamicModule, Global, Module } from "@nestjs/common";
import { AsyncModule, AsyncOptions } from "@jbiskur/nestjs-async-module";
import { LogModuleOptions } from "./interfaces";
import { LOG_MODULE_OPTIONS } from "./constants";
import { createOptionsModule } from "@jbiskur/nestjs-options-module-factory";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import { createLoggerProviders } from "./logger.providers";
import { LoggerService } from "./logger/logger.service";
import { LoggerTransportFactory } from "./factories";

@Global()
@Module({})
export class LoggerModule extends AsyncModule {
  public static forRootAsync(
    options: AsyncOptions<LogModuleOptions>,
  ): DynamicModule {
    const moduleOptions = createOptionsModule(LOG_MODULE_OPTIONS, options);
    const loggerProviders = createLoggerProviders();

    return {
      ...this.doRegisterAsync<LogModuleOptions>(LoggerModule, null, null, {
        imports: [
          moduleOptions,
          WinstonModule.forRootAsync({
            useFactory: (logOptions: LogModuleOptions) => {
              const options: winston.LoggerOptions = {
                level: logOptions.level ?? "info",
                transports: [],
              };

              if (logOptions.pretty) {
                options.transports = [LoggerTransportFactory.prettyFormat()];
              } else {
                options.transports = [LoggerTransportFactory.jsonFormat()];
              }

              return options;
            },
            inject: [LOG_MODULE_OPTIONS],
            imports: [moduleOptions],
          }),
        ],
        providers: [LoggerService, ...loggerProviders],
        exports: [LoggerService, ...loggerProviders],
      }),
    };
  }
}
