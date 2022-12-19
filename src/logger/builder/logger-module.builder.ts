import { LoggerModule } from "../logger.module";
import { LoggerModuleConfiguration } from "../config/logger.configuration";
import { BaseBuilder, ConfigService } from "../../config";

export class LoggerModuleBuilder extends BaseBuilder {
  requiredContext = ["logger"];

  override build() {
    super.build();

    if (!this.config) {
      throw new Error(`Missing config for ${this.constructor.name}`);
    }

    return LoggerModule.forRootAsync({
      imports: [this.config],
      inject: [ConfigService],
      useFactory: (config: ConfigService<LoggerModuleConfiguration>) => ({
        level: config.schema.logger.level,
        pretty: config.schema.logger.pretty,
        useLevelLabels: config.schema.logger.useLabels,
      }),
    });
  }
}
