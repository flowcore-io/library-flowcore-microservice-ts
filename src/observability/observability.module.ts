import { Module } from "@nestjs/common";
import { DatadogTraceModule } from "nestjs-ddtrace";

@Module({
  imports: [DatadogTraceModule.forRoot()],
})
export class ObservabilityModule {}
