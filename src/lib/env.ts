export function getenv(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (typeof value !== "undefined") {
    return value;
  }

  if (typeof defaultValue === "undefined") {
    throw new Error(`The environment variable "${name}" is required but was not loaded`);
  }

  return defaultValue;
}
