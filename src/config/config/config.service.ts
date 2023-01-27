import { Injectable } from "@nestjs/common";
import { ConfigurationSchema, EnvLink } from "../interfaces";
import { z } from "zod";
import * as dotenv from "dotenv";

@Injectable()
export class ConfigService<T> {
  public schema: T;

  private fullConfiguration = {
    linking: {},
    shape: z.object({}),
  };

  constructor(private config: ConfigurationSchema[]) {
    dotenv.config();
    this.config.forEach((config) => {
      this.fullConfiguration.linking = {
        ...this.fullConfiguration.linking,
        ...config.linking,
      };
      if (!config.shape) {
        throw new Error("No shape defined");
      }
      this.fullConfiguration.shape = this.fullConfiguration.shape.merge(
        config.shape,
      );
    });

    const configObject = this.fillLinkedValues(this.fullConfiguration.linking);

    this.schema = this.fullConfiguration.shape.parse(configObject) as T;
  }

  private fillLinkedValues(linking: EnvLink) {
    const filled: any = {};
    Object.keys(linking).forEach((key) => {
      const linkingElement = linking[key];
      if (linkingElement && !linkingElement["env"]) {
        filled[key] = this.fillLinkedValues(linkingElement as EnvLink);
      } else {
        filled[key] = process.env[linkingElement["env"] as string]
          ? process.env[linkingElement["env"] as string]
          : linkingElement["default"];
      }
    });

    return filled;
  }
}
