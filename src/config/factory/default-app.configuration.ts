import { z } from "zod";
import { ConfigurationSchema } from "../interfaces";

export const DefaultAppConfigurationShape = z.object({
  port: z.number().min(0),
});
export type DefaultAppConfiguration = z.infer<
  typeof DefaultAppConfigurationShape
>;

export class DefaultAppConfigurationSchema extends ConfigurationSchema {
  context = "default";
  linking = {
    port: {
      env: "PORT",
      default: 3000,
    },
  };
  shape = DefaultAppConfigurationShape;

  constructor(overrideDefaults?: { [key: string]: any }) {
    super();
    ConfigurationSchema.override(this.linking, overrideDefaults);
  }
}
