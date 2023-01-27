import { ConfigurationSchema } from "../interfaces";
import { DefaultAppConfigurationSchema } from "./default-app.configuration";
import { Type } from "@nestjs/common";

export class ConfigFactory {
  private schemas = new Map<string, ConfigurationSchema>();
  private default = true;

  usingNoDefault() {
    this.default = false;
    return this;
  }

  withSchema(
    schema: Type<ConfigurationSchema>,
    overrideDefaults?: { [key: string]: any },
  ) {
    const schemaInstance = new schema(overrideDefaults);
    if (!schemaInstance.context) {
      throw new Error(
        "Schema must have a context defined. Use the static context property",
      );
    }
    this.schemas.set(schemaInstance.context, schemaInstance);
    return this;
  }

  getSchemas = () => this.schemas;

  build() {
    if (this.default) {
      this.schemas.set("default", new DefaultAppConfigurationSchema());
    }
    return Array.from(this.schemas.values());
  }
}
