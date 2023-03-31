import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import { Controller, Get, Injectable, Module } from "@nestjs/common";
import supertest from "supertest";
import {
  CheckHealth,
  HealthCheckIndicator,
  HealthModuleBuilder,
  HealthService,
} from "../src";
import {
  HealthCheck,
  HealthCheckError,
  HealthCheckResult,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(private health: HealthService) {}

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check();
  }
}

describe("Health Module", () => {
  it("should return status 200", async () => {
    @Injectable()
    @HealthCheckIndicator()
    class HealthyService extends HealthIndicator implements CheckHealth {
      async isHealthy(): Promise<HealthIndicatorResult> {
        return this.getStatus("healthy", true);
      }
    }

    @Module({
      imports: [
        new HealthModuleBuilder().usingController(HealthController).build(),
      ],
      controllers: [],
      providers: [HealthyService],
    })
    class HealthyModule {}

    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(HealthyModule))
      .build();

    const result = await supertest(app.getHttpServer())
      .get("/health")
      .expect(200);

    expect(result.body.status).toBe("ok");
    expect(result.body.info.healthy.status).toBe("up");
    await app.close();
  });

  it("should return status 503", async () => {
    @Injectable()
    @HealthCheckIndicator()
    class UnhealthyService extends HealthIndicator implements CheckHealth {
      async isHealthy(): Promise<HealthIndicatorResult> {
        const result = super.getStatus("unhealthy", false);
        throw new HealthCheckError("unhealthy", result);
      }
    }

    @Module({
      imports: [
        new HealthModuleBuilder().usingController(HealthController).build(),
      ],
      controllers: [],
      providers: [UnhealthyService],
    })
    class UnhealthyModule {}

    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(UnhealthyModule))
      .build();

    const result = await supertest(app.getHttpServer())
      .get("/health")
      .expect(503);

    expect(result.body.status).toBe("error");
    expect(result.body.error.unhealthy.status).toBe("down");
    await app.close();
  });
});
