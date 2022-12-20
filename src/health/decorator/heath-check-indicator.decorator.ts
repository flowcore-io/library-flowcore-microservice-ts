import { SetMetadata } from "@nestjs/common";

export const HEALTH_CHECK_KEY = "HEALTH_CHECK_KEY";
export const HealthCheckIndicator = (...args: string[]) =>
  SetMetadata(HEALTH_CHECK_KEY, args);
