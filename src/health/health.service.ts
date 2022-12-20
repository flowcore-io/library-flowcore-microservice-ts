import { flatten, Injectable, OnModuleInit } from "@nestjs/common";
import { ModulesContainer } from "@nestjs/core";
import { HealthCheckService } from "@nestjs/terminus";
import { HEALTH_CHECK_KEY } from "./decorator/heath-check-indicator.decorator";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import { CheckHealth } from "./interfaces/check-health.interface";

@Injectable()
export class HealthService implements OnModuleInit {
  private healthCheckIndicators: InstanceWrapper<CheckHealth>[] = [];

  constructor(
    private health: HealthCheckService,
    private readonly modulesContainer: ModulesContainer,
  ) {}

  check() {
    return this.health.check(
      this.healthCheckIndicators.map(
        (wrapper) => () => wrapper.instance.isHealthy(),
      ),
    );
  }

  onModuleInit() {
    const modules = [...this.modulesContainer.values()];
    const providers = flatten(
      modules.map((module) => [...module.providers.values()]),
    );

    providers.forEach((provider) => {
      if (provider?.instance?.constructor) {
        const healthCheckKey = Reflect.getMetadata(
          HEALTH_CHECK_KEY,
          provider.instance.constructor,
        );

        if (healthCheckKey) {
          const wrapper = provider as InstanceWrapper<CheckHealth>;
          if (!wrapper.instance.isHealthy) {
            throw new Error(
              `The class ${wrapper.name} must implement the CheckHealth interface`,
            );
          }

          this.healthCheckIndicators.push(
            provider as InstanceWrapper<CheckHealth>,
          );
        }
      }
    });
  }
}
