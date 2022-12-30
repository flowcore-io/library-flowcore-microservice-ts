module.exports = {
  collectCoverageFrom: ["./src/**/*.(t|j)s"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        ancestorSeparator: " › ",
        classNameTemplate: "{classname}-{title}",
        outputDirectory: "test-results",
        suiteName: "{{properties.name}} Library Test",
        titleTemplate: "{classname}-{title}",
        uniqueOutputName: "true",
        usePathForSuiteName: "true",
      },
    ],
  ],
  rootDir: ".",
  setupFiles: ["./test/setup-env-vars.ts"],
  testEnvironment: "node",
  testRegex: "./test/.*\\.spec\\.ts$",
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
};
