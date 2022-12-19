import { Module } from "@nestjs/common";
import { ConfigService } from "./config/config.service";
import { ConfigFactory } from "./factory/config.factory";

@Module({})
export class ConfigModule {
  static contexts: string[] = [];

  public static forRoot(factory: ConfigFactory) {
    if (
      ConfigModule.contexts.length > 0 &&
      process.env["NODE_ENV"] !== "test"
    ) {
      console.warn(
        "ConfigModule.forRoot() called multiple times, loaded contexts validation willl not be reliable",
      );
    }
    factory.getSchemas().forEach((schema) => {
      ConfigModule.contexts.push(schema.context);
    });

    const configServiceProvider = {
      provide: ConfigService,
      useValue: new ConfigService(factory.build()),
    };
    return {
      module: ConfigModule,
      providers: [configServiceProvider],
      exports: [configServiceProvider],
    };
  }
}
