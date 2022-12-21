export * from "./interfaces/metrics-module-options.interface";
export * from "./builder/metrics.builder";
export * from "./metrics.module";
export {
  PrometheusController,
  makeCounterProvider,
  makeGaugeProvider,
  makeHistogramProvider,
  makeSummaryProvider,
  InjectMetric,
} from "@willsoto/nestjs-prometheus";
export { Counter, Gauge, Histogram, Summary } from "prom-client";
