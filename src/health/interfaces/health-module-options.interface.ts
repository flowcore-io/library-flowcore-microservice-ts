import { Type } from "@nestjs/common";

export interface HealthModuleOptions {
  controller: Type<unknown>;
}
