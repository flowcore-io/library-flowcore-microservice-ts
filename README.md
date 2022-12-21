![Build](https://github.com/flowcore-io/library-flowcore-microservice-ts/actions/workflows/publish.yml/badge.svg)

# Flowcore Microservice

The flowcore microservice library is designed to provide strong opinions on how to handle configuration, logging, health
checks, metrics, and
observability. It provides a set of modules that allow you to quickly set up services.

The library is particularly well-suited for use in microservice architectures, where it can help you
quickly and easily set up the essential components of configuration, logging, health checks, metrics, and observability.

## Installation

install with npm:

```bash
npm install @flowcore/microservice @nestjs/core @nestjs/common @nestjs/terminus
```

or yarn:

```bash
yarn add @flowcore/microservice @nestjs/core @nestjs/common @nestjs/terminus
```

## Usage

The library provides a set of modules that allow you to quickly set up services. The modules are:

- [Configuration](#configuration)
- [Logging](#logging)
- [Health](#health)
- [Metrics](#metrics)
- [Observability](#observability)

### Configuration

The configuration library uses zod to validate the configuration. It provides a set of primitives that can be used to
create configuration schemas. The library also provides a configuration Module that can load and validate configuration
from environment variables.

To use the module first create a configuration schema.

```typescript
// config file
import {z} from "zod";
import {ConfigurationSchema} from "@flowcore/microservice";

export const SomeConfigurationShape = z.object({
  someKey: z.string(),
});
export type SomeConfiguration = z.infer<typeof SomeConfigurationShape>;

export class SomeConfigurationSchema extends ConfigurationSchema {
  context = "some-context";
  linking = {
    someKey: {
      env: "SOME_KEY"
    },
  };
  shape = SomeConfigurationShape;
}

```

then create a module builder that uses the configuration schema.

```typescript
// module builder
import {SomeModule} from "./some.module";
import {BaseBuilder, ConfigService} from "@flowcore/microservice";

export class SomeModuleBuilder extends BaseBuilder {
  requiredContext = ["some-context"];

  override build() {
    super.build();

    if (!this.config) {
      throw new Error(`Missing config for ${this.constructor.name}`);
    }

    return SomeModule.registerAsync({
      imports: [this.config],
      inject: [ConfigService],
      useFactory: (config: ConfigService<SomeConfiguration>) => ({
        someKey: config.schema.someKey,
      }),
    });
  }
}
```

> **requiredContext** is used when you want the configuration to be required. If the configuration is not provided the
> module will throw an error.

Then to use the builder and configuration in your service.

```typescript
// app module
import {Module} from "@nestjs/common";
import {SomeModuleBuilder} from "./some-builder";
import {SomeConfigurationSchema} from "./some-config";
import {
  ConfigFactory,
  ConfigModule,
} from "@flowcore/microservice";

const config = ConfigModule.forRoot(
  new ConfigFactory()
    // ... other schemas
    .withSchema(SomeConfigurationSchema),
  // ... other schemas
);

@Module({
  imports: [
    config,
    // ... other modules
    new SomeModuleBuilder().withConfig(config).build(),
    // ... other modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

```

The configuration module has a `DefaultAppConfigurationSchema` that will be applied unless explicitly set to false. The
default configuration schema will load the following environment variables:

- `PORT` - the port the service will listen on for http endpoints, for example /health and /metrics (default: 3000)

> this is exported as the `DefaultAppConfiguration` interface in the `@flowcore/microservice` package. And can be used
> when accessing the configuration through `useFactory`.

### Logging

The logging library uses `winston` and `nest-winston` to provide logging. It provides configuration and injection
mechanics for the winston logger.

To use the module load the configuration schema into the configuration factory and import the logging module using the
builder.

```typescript
// app module
import {Module} from "@nestjs/common";
import {
  ConfigFactory,
  ConfigModule,
  LoggerModuleBuilder,
  LoggerModuleConfigurationSchema,
} from "@flowcore/microservice";

const config = ConfigModule.forRoot(
  new ConfigFactory()
    // ... other schemas
    .withSchema(LoggerModuleConfigurationSchema),
  // ... other schemas
);

@Module({
  imports: [
    config,
    // ... other modules
    new LoggerModuleBuilder().withConfig(config).build(),
    // ... other modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

```

the logging module will load the following environment variables:

- `LOG_LEVEL` - the log level to use for the logger (default: info)
- `LOG_PRETTY_PRINT` - whether to pretty print the logs (default: false)
- `LOG_USE_LABELS` - whether to use labels in the logs (default: false)

> this is exported as the `LoggerModuleConfiguration` interface in the `@flowcore/microservice` package. And can be used
> when accessing the configuration through `useFactory`.

### Health

The health module uses `@nestjs/terminus` to provide health checks. It provides decorator that can be used to collect
health checks.

to use the module, first create a health controller.

```typescript
// health controller
import {Controller, Get} from "@nestjs/common";
import {HealthCheck, HealthCheckResult} from "@nestjs/terminus";
import {HealthService} from "@flowcore/microservice";

@Controller("health")
export class HealthController {
  constructor(private health: HealthService) {
  }

  @Get()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check();
  }
}

```

> Remember to add an access decorator to the health check endpoint if you are using authentication in your application.

Then import it and the `HealthModule` into your application module.

```typescript
// app module
import {Module} from "@nestjs/common";
import {
  ConfigFactory,
  ConfigModule,
  HealthModule,
} from "@flowcore/microservice";
import {HealthController} from "./health.controller";

@Module({
  imports: [
    HealthModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {
}
```

Then to add health checks to the service, use the `@HealthCheckIndicator` decorator.

```typescript
// some health check
import {HealthCheckIndicator, CheckHealth} from "@flowcore/microservice";
import {Injectable} from "@nestjs/common";
import {HealthIndicator, HealthIndicatorResult} from "@nestjs/terminus";

@Injectable()
@HealthCheckIndicator()
class HealthyService extends HealthIndicator implements CheckHealth {
  async isHealthy(): Promise<HealthIndicatorResult> {
    // do some health check logic
    return this.getStatus(/* some key */, /* true or false */);
  }
}
```

> Remember to add the `HealthModule` to the module imports.

### Metrics

The metrics module is a wrapper around `@willsoto/nestjs-prometheus` to provide metrics for the service. It provides a
module that can be configured and imported into the application module.

To use the module, first create a metrics controller.

```typescript
// metrics controller
import {Controller, Get, Res} from "@nestjs/common";
import {PrometheusController} from "@flowcore/microservice";
import {Response} from "express";

@Controller()
export class MetricsController extends PrometheusController {
  @Get()
  async index(@Res() response: Response) {
    return super.index(response);
  }
}
```

Then import it and the `MetricsModule` into your application module using the builder.

```typescript
// app module
import {Module} from "@nestjs/common";
import {MetricsController} from "./metrics.controller";
import {MetricsModuleBuilder} from "@flowcore/microservice";

@Module({
  imports: [
    // ... other modules
    new MetricsModuleBuilder().usingController(MetricsController).build()
    // ... other modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
```

to use the metrics module, follow the instructions in
the [`@willsoto/nestjs-prometheus`](https://www.npmjs.com/package/@willsoto/nestjs-prometheus) package.

> The `createCounterProvider` and the `Counter` class are exported from the `@flowcore/microservice` package, same goes
> for `Gauge`,`Histogram` and`Summary`. So you can import them from there instead of the `@willsoto/nestjs-prometheus`
> and `prom-client` packages.

To use default node metrics exported from the `@willsoto/nestjs-prometheus` package, use the `withDefaultMetrics` method
when building the metrics module.

To add default labels to all metrics, use the `withDefaultLabels` method when building the metrics module.

### Observability

the observability module provides a wrapper around the [`nestjs-ddtrace`](https://www.npmjs.com/package/nestjs-ddtrace)
package to provide observability.

To use the module, first import the tracer at the top of your main.ts file.

```typescript
// main.ts
import "@flowcore/microservice/dist/tracer";
// ... rest of main file
```

then import the `ObservabilityModule` into your application module.

```typescript
// app module
import {Module} from "@nestjs/common";
import {ObservabilityModule} from "@flowcore/microservice";

@Module({
  imports: [
    // ... other modules
    ObservabilityModule,
    // ... other modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
```

> `Span` and `TracerService` are exported from the `@flowcore/microservice` package, so you can import them from there