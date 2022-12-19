import { ZodObject } from "zod";

export interface EnvLink {
  [key: string]: { env: string } | { [key: string]: { env: string } };
}

export abstract class ConfigurationSchema {
  abstract context: string;
  abstract linking: EnvLink;
  abstract shape: ZodObject<any>;
}
