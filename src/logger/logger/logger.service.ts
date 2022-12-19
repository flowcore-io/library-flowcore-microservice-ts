/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Scope } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  public setContext(context: string) {
    this.context = context;
  }

  public getContext(): string {
    return this.context;
  }

  public info(message: string, meta: any = null) {
    this.logger.info(message, this.enrichMetaData(meta));
  }

  public debug(message: string, meta: any = null) {
    this.logger.debug(message, this.enrichMetaData(meta));
  }

  public warn(message: string, meta: any = null) {
    this.logger.warn(message, this.enrichMetaData(meta));
  }

  public error(message: string, meta: any = null) {
    this.logger.error(message, this.enrichMetaData(meta));
  }

  private enrichMetaData(meta: any) {
    if (this.context) {
      meta = {
        ...meta,
        context: this.context,
      };
    }

    return meta;
  }
}
