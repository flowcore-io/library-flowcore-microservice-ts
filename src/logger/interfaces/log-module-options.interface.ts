export interface LogModuleOptions {
  level?: string;
  useLevelLabels?: boolean;
  pretty?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: { [key: string]: any };
}
