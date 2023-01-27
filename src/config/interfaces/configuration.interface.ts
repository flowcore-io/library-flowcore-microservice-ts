import { ZodObject } from "zod";
import * as _ from "lodash";

export interface EnvLink {
  [key: string]:
    | { env: string; default?: any }
    | { [key: string]: { env: string } };
}

export abstract class ConfigurationSchema {
  public context: string | undefined;
  public shape: ZodObject<any> | undefined;
  public linking: EnvLink | undefined;

  public static override(
    linking: EnvLink,
    overrideDefaults?: { [key: string]: any },
  ) {
    if (overrideDefaults) {
      Object.keys(overrideDefaults).forEach((key) => {
        if (_.has(linking, key)) {
          const org = _.get(linking, key);
          _.set(linking, key, {
            ...org,
            default: overrideDefaults[key],
          });
        }
      });
    }
  }
}
