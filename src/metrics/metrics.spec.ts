import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import { Controller, Get, Module, Res } from "@nestjs/common";
import supertest from "supertest";
import { MetricsModuleBuilder } from "./builder/metrics.builder";
import { Response } from "express";
import { PrometheusController } from "@willsoto/nestjs-prometheus";

@Controller()
class MetricsController extends PrometheusController {
  @Get()
  async index(@Res() response: Response) {
    return super.index(response);
  }
}

describe("Metrics", () => {
  it("should respond with 200 on metrics endpoint", async () => {
    @Module({
      imports: [
        new MetricsModuleBuilder().usingController(MetricsController).build(),
      ],
    })
    class TestModule {}

    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(TestModule))
      .build();

    await supertest(app.getHttpServer()).get("/metrics").expect(200);

    await app.close();
  });
});
