import { z } from "zod";

export const safeBoolean = (defaultValue = false) =>
  z
    .string()
    .default(String(defaultValue))
    .transform<boolean>((value) => value == "true" || value == "1");
