import { Module } from "@nestjs/common";
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { MetricsModuleOptions } from "./interfaces/metrics-module-options.interface";

@Module({})
export class MetricsModule {
  public static forRoot(options: MetricsModuleOptions) {
    return {
      module: MetricsModule,
      imports: [
        PrometheusModule.register({
          defaultMetrics: {
            enabled: options.defaultMetrics ? options.defaultMetrics : false,
          },
          ...(options.defaultLabels && {
            defaultLabels: options.defaultLabels,
          }),
          controller: options.controller,
        }),
      ],
    };
  }
}
