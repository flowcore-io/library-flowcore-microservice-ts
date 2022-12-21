import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import { Controller, Get, Injectable, Module } from "@nestjs/common";
import supertest from "supertest";
import { HealthModule } from "./health.module";
import { HealthCheckIndicator } from "./decorator/heath-check-indicator.decorator";
import { CheckHealth } from "./interfaces/check-health.interface";
import {
  HealthCheck,
  HealthCheckResult,
  HealthIndicator,
  HealthIndicatorResult,
} from "@nestjs/terminus";
import { HealthService } from "./health.service";

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
      imports: [HealthModule],
      controllers: [HealthController],
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
      async isHealthy() {
        return super.getStatus("unhealthy", false);
      }
    }

    @Module({
      imports: [HealthModule],
      controllers: [HealthController],
      providers: [UnhealthyService],
    })
    class UnhealthyModule {}

    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(UnhealthyModule))
      .build();

    const result = await supertest(app.getHttpServer())
      .get("/health")
      .expect(200);

    expect(result.body.status).toBe("ok");
    expect(result.body.info.unhealthy.status).toBe("down");
    await app.close();
  });
});
