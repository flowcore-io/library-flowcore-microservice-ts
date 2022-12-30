import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import {
  ConfigFactory,
  ConfigModule,
  InjectLogger,
  LoggerModuleBuilder,
  LoggerModuleConfigurationSchema,
  LoggerService,
} from "../src";
import { Injectable, Module } from "@nestjs/common";

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
});
