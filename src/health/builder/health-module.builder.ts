import { BaseBuilder } from "../../config";
import { HealthModule } from "../health.module";
import { DynamicModule, Type } from "@nestjs/common";

export class HealthModuleBuilder extends BaseBuilder {
  requiredContext: string[] = [];
  private controller: Type<unknown> | undefined;

  usingController(controller: Type<unknown>): this {
    this.controller = controller;
    return this;
  }

  override build(): DynamicModule {
    if (!this.controller) {
      throw new Error("Controller must be provided");
    }

    return HealthModule.forRoot({
      controller: this.controller,
    });
  }
}
