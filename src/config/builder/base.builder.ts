import { DynamicModule } from "@nestjs/common";
import { ConfigModule } from "../config.module";

export abstract class BaseBuilder {
  abstract requiredContext: string[];
  protected config: DynamicModule | undefined;

  withConfig(config: DynamicModule): this {
    this.config = config;
    return this;
  }

  build(): DynamicModule | null {
    this.validateContext();
    return null;
  }

  private validateContext() {
    if (!this.requiredContext) {
      return;
    }

    if (!this.config) {
      throw new Error(
        `Missing required context ${this.requiredContext} for ${this.constructor.name}`,
      );
    }

    this.requiredContext.forEach((requiredContext) => {
      if (!ConfigModule.contexts.includes(requiredContext)) {
        throw new Error(
          `Missing required context ${requiredContext} for ${this.constructor.name}`,
        );
      }
    });
  }
}
