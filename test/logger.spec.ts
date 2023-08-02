import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import {
  ConfigFactory,
  ConfigModule,
  ConfigService,
  createSimpleLogger,
  DefaultAppConfiguration,
  InjectLogger,
  LoggerModuleBuilder,
  LoggerModuleConfiguration,
  LoggerModuleConfigurationSchema,
  LoggerService,
} from "../src";
import { Injectable, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

@Injectable()
export class TestLogger {
  constructor(
    @InjectLogger(TestLogger.name) private readonly logger: LoggerService,
  ) {}

  log(message: string) {
    this.logger.info(message);
  }
}

describe("Logger Module", () => {
  it("should not throw when trying to log", async () => {
    const config = ConfigModule.forRoot(
      new ConfigFactory().withSchema(LoggerModuleConfigurationSchema),
    );

    @Module({
      imports: [config, new LoggerModuleBuilder().withConfig(config).build()],
      providers: [TestLogger],
    })
    class TestModule {}

    const app = await new NestApplicationBuilder()
      .withTestModule((testModule) => testModule.withModule(TestModule))
      .build();

    const test = await app.resolve(TestLogger);

    expect(() => test.log("hello world")).not.toThrow();
    await app.close();
  });

  it("should work to create simple logger and override the log level", async () => {
    const cfg = ConfigModule.forRoot(
      new ConfigFactory().withSchema(LoggerModuleConfigurationSchema),
    );
    @Module({
      imports: [cfg, new LoggerModuleBuilder().withConfig(cfg).build()],
      providers: [TestLogger],
    })
    class TestModule {}

    const app = await NestFactory.create(TestModule, { bufferLogs: true });

    const config = (await app.resolve(ConfigService)) as ConfigService<
      LoggerModuleConfiguration & DefaultAppConfiguration
    >;

    const logger = createSimpleLogger({
      ...config.schema,
      logger: {
        ...config.schema.logger,
        level: "error",
      },
    });

    app.useLogger(logger);

    expect(() => logger.error(`hello world`)).not.toThrow();
  });
});
