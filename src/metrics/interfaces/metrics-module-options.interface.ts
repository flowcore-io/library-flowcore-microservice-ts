import { Type } from "@nestjs/common";

export interface MetricsModuleOptions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  defaultLabels?: Object;
  defaultMetrics?: boolean;

  controller: Type<unknown>;
}
