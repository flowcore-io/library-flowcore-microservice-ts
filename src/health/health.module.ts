import { DynamicModule, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthService } from "./health.service";
import { HealthModuleOptions } from "./interfaces/health-module-options.interface";

@Module({})
export class HealthModule {
  public static forRoot(options: HealthModuleOptions): DynamicModule {
    return {
      module: HealthModule,
      imports: [TerminusModule],
      controllers: [options.controller],
      providers: [HealthService],
      exports: [HealthService],
    };
  }
}
