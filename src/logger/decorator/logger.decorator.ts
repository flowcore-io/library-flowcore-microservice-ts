import { Inject } from "@nestjs/common";
import { LOGGER_SERVICE } from "../constants";

export const loggerContexts: string[] = new Array<string>();

export function InjectLogger(context = "") {
  if (!loggerContexts.includes(context)) {
    loggerContexts.push(context);
  }

  return Inject(`${LOGGER_SERVICE}${context}`);
}
