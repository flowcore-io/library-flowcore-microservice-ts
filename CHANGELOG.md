# Changelog

## [5.0.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v4.0.1...v5.0.0) (2024-01-22)


### ⚠ BREAKING CHANGES

* removed unused datadog tracer and updated documentation

### Features

* removed unused datadog tracer, bumped packages ([c5a0860](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/c5a086078885b762363df0a5e72038849a8a17f3))


### Bug Fixes

* updated nestjs peer dependency versions ([93fcc17](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/93fcc174fe318b81c81a56920024750c9ef31683))


### Code Refactoring

* removed unused datadog tracer and updated documentation ([6b8396d](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/6b8396da73f7586e6bf3fb5e80d4675fbcbf7da1))

## [4.0.1](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v4.0.0...v4.0.1) (2023-08-02)


### Bug Fixes

* added missing log level configuration to simple logger ([a775a8f](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/a775a8fb1fab18fde8f315ba54239d2fdb048395))

## [4.0.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v3.2.0...v4.0.0) (2023-06-20)


### ⚠ BREAKING CHANGES

* updated nestjs libs to v10

### Features

* updated nestjs and [@jbiskur](https://github.com/jbiskur) nest libraries to v10 ([3f76910](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/3f769104c6a2d3d69a4954490936c0c53781117e))


### Bug Fixes

* **deps:** update jbiskur packages to v4 ([2c8dafc](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/2c8dafc8ffc44434ee493c347ae5809dd6b8b5c5))

## [3.2.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v3.1.1...v3.2.0) (2023-01-27)


### Features

* added strict null checks to library, for better Zod support ([b9a9c78](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/b9a9c787ea62a8414df2c38d5fefd4d6b544e1f8))

## [3.1.1](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v3.1.0...v3.1.1) (2023-01-12)


### Bug Fixes

* added numeric coercion to port env of the default app configuration ([895be3a](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/895be3a8ee2b191be256c1311e46f05d5c2f03bd))

## [3.1.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v3.0.0...v3.1.0) (2023-01-09)


### Features

* added functionality to override default values in a configuration schema ([738741c](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/738741cc9d7d42798396764b26a848653c97e8ab))

## [3.0.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.3.0...v3.0.0) (2022-12-21)


### ⚠ BREAKING CHANGES

* changed signature of HealthModule to use forRoot, changed MetricsModule to use forRoot to conform to other modules.

### Features

* added health module builder ([2aa1413](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/2aa141385a8db07fce3cd8a01389bf72b40f3589))

## [2.3.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.2.0...v2.3.0) (2022-12-21)


### Features

* added observability module with tracer ([25839ae](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/25839ae5ce41fcae4a8f35d548bec513784489c4))


### Bug Fixes

* added missing observability export ([1f280d4](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/1f280d48cc2ad47616b3ee53003e7ed50c60af39))
* fixed missing metrics export ([d71124b](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/d71124b4f95583669a3790150f89f41175bb385e))

## [2.2.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.1.0...v2.2.0) (2022-12-21)


### Features

* added metrics module ([386d129](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/386d129dcf5bbe1428e359df5313bc983ea268a4))

## [2.1.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.0.2...v2.1.0) (2022-12-21)


### Features

* removed health controller added export of HealthService ([bf46df6](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/bf46df6e36a2f8b70cc666663999450474bcf2d9))

## [2.0.2](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.0.1...v2.0.2) (2022-12-20)


### Bug Fixes

* fixed build script typo ([fbb57e3](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/fbb57e3db946f0c77ee209971cbd0da9c21a77d0))

## [2.0.1](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v2.0.0...v2.0.1) (2022-12-20)


### Bug Fixes

* added missing nestjs cli dev dependency ([84cd538](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/84cd538df5d5a022db820c2b95944de5315448e4))

## [2.0.0](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v1.0.3...v2.0.0) (2022-12-20)


### ⚠ BREAKING CHANGES

* switched back to single entry point due to NestJS and Vite/Esbuild incompatibilities.

### Features

* added Health check module ([0015bd6](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/0015bd6fbc355c7bde6be970a170010a9abf628b))
* changed from vite and esbuild back to webpack ([aa5fb12](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/aa5fb129f9674bdbc922952e85697c4a6e1679d9))

## [1.0.3](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v1.0.2...v1.0.3) (2022-12-19)


### Bug Fixes

* added registry to setup node ([c544b3d](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/c544b3dde7d958576320eb51211492a8ad267413))

## [1.0.2](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v1.0.1...v1.0.2) (2022-12-19)


### Bug Fixes

* added registry to setup node ([57de47b](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/57de47bd8144378f89f8251fca63f68b380a8f94))

## [1.0.1](https://github.com/flowcore-io/library-flowcore-microservice-ts/compare/v1.0.0...v1.0.1) (2022-12-19)


### Bug Fixes

* changed to npm publish ([f436dbb](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/f436dbb0dff2292435873a1e2625425b55e0de96))

## 1.0.0 (2022-12-19)


### Features

* initial version with config and logger ([6693f78](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/6693f78431287f0e9371d399c933454a66e46af0))


### Bug Fixes

* added checkout to release please step for name extraction ([1be66d3](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/1be66d35cfd7b827a93c890bc6c0334d892578f7))
* moved workflows to the correct place ([de73abc](https://github.com/flowcore-io/library-flowcore-microservice-ts/commit/de73abccbd490dac32d170c2e8e16db341f0f3e7))
