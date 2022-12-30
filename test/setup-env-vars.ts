import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, ".env.config"),
  override: false,
});
