import { BaseBuilder } from "../../config";
import { DynamicModule, Type } from "@nestjs/common";
import { MetricsModule } from "../metrics.module";

export class MetricsModuleBuilder extends BaseBuilder {
  requiredContext: string[] = [];
  private labels = {};
  private defaultMetrics = false;
  private controller: Type<unknown> | undefined;

  withDefaultLabels(labels: Record<string, string>): MetricsModuleBuilder {
    this.labels = labels;
    return this;
  }

  withDefaultMetrics(): MetricsModuleBuilder {
    this.defaultMetrics = true;
    return this;
  }

  usingController(controller: Type<unknown>): MetricsModuleBuilder {
    this.controller = controller;
    return this;
  }

  override build(): DynamicModule {
    if (!this.controller) {
      throw new Error("Controller must be provided");
    }

    return MetricsModule.forRoot({
      defaultLabels: this.labels,
      defaultMetrics: this.defaultMetrics,
      controller: this.controller,
    });
  }
}
