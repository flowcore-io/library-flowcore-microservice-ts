import { z } from "zod";
import { ConfigurationSchema } from "../interfaces";

export const DefaultAppConfigurationShape = z.object({
  port: z.number().min(0).default(3000),
});
export type DefaultAppConfiguration = z.infer<
  typeof DefaultAppConfigurationShape
>;

export class DefaultAppConfigurationSchema extends ConfigurationSchema {
  context = "default";
  linking = {
    port: {
      env: "PORT",
    },
  };
  shape = DefaultAppConfigurationShape;
}
