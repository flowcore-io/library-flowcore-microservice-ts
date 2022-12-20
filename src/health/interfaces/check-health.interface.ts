import { HealthIndicatorResult } from "@nestjs/terminus";

export interface CheckHealth {
  isHealthy: () => Promise<HealthIndicatorResult>;
}
