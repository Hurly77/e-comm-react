export function logMethod(key: string, path: string, response: unknown) {
  const { debug, groupCollapsed, groupEnd } = console;
  if (process.env.NODE_ENV === "development") {
    groupCollapsed(key);
    debug("response", response);
    debug("path", path);
    groupEnd();
  }
}
