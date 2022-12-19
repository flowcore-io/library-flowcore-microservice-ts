import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import { ConfigModule } from "./config.module";
import { ConfigFactory } from "./factory/config.factory";
import * as dotenv from "dotenv";
import * as path from "path";
import { z } from "zod";
import { ConfigurationSchema } from "./interfaces";
import { ConfigService } from "./config/config.service";
import { BaseBuilder } from "./builder/base.builder";
import { DynamicModule, Module } from "@nestjs/common";

dotenv.config({
  path: path.join(__dirname, ".env.config"),
  override: false,
});

describe("Config Module", () => {
  it("should load", async () => {
    const testConfigShape = z.object({
      hello: z.string(),
    });

    type TestConfig = z.infer<typeof testConfigShape>;

    class TestConfigSchema extends ConfigurationSchema {
      context = "test";
      linking = {
        hello: {
          env: "TEST_HELLO",
        },
      };
      shape = testConfigShape;
    }

    const app = await new NestApplicationBuilder()
      .withTestModule((testModule) =>
        testModule.withModule(
          ConfigModule.forRoot(
            new ConfigFactory().withSchema(TestConfigSchema),
          ),
        ),
      )
      .build();
    expect(app.get(ConfigModule)).toBeDefined();
    expect(
      (app.get(ConfigService) as ConfigService<TestConfig>).schema.hello,
    ).toBe("world");
    await app.close();
  });

  it("should fail when missing environment variable", async () => {
    const missingConfigShape = z.object({
      missing: z.string(),
    });

    class MissingConfigSchema implements ConfigurationSchema {
      context = "missing";
      linking = {
        missing: {
          env: "MISSING_ENV",
        },
      };
      shape = missingConfigShape;
    }

    await expect(async () => {
      await new NestApplicationBuilder()
        .withTestModule((testModule) =>
          testModule.withModule(
            ConfigModule.forRoot(
              new ConfigFactory().withSchema(MissingConfigSchema),
            ),
          ),
        )
        .build();
    }).rejects.toThrow();
  });

  it("should fail when missing required context", async () => {
    const message = "hello-world";
    const lostConfigShape = z.object({
      some: z.string().default(message),
    });

    class LostConfigSchema implements ConfigurationSchema {
      context = "found";
      linking = {
        some: {
          env: "MISSING_ENV",
        },
      };
      shape = lostConfigShape;
    }

    class SomeBuilder extends BaseBuilder {
      build(): DynamicModule {
        super.build();

        return {
          module: SomeBuilder,
        };
      }

      requiredContext: string[] = ["found"];
    }

    const lostConfig = ConfigModule.forRoot(new ConfigFactory());

    await expect(async () => {
      @Module({
        imports: [lostConfig, new SomeBuilder().withConfig(lostConfig).build()],
      })
      class FailingModule {}

      await new NestApplicationBuilder()
        .withTestModule((testModule) => testModule.withModule(FailingModule))
        .build();
    }).rejects.toThrow();

    const foundConfig = ConfigModule.forRoot(
      new ConfigFactory().withSchema(LostConfigSchema),
    );

    await expect(async () => {
      @Module({
        imports: [
          foundConfig,
          new SomeBuilder().withConfig(foundConfig).build(),
        ],
      })
      class WorkingModule {}

      const app = await new NestApplicationBuilder()
        .withTestModule((testModule) => testModule.withModule(WorkingModule))
        .build();

      await app.close();

      return true;
    }).toBeTruthy();
  });
});
