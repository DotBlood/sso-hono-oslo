export const configSingleton = (() => {
  let instance: Record<string, string | undefined> = {};

  return {
    get(key: string): string {
      if (instance[key]) {
        return instance[key]!;
      }

      if (Bun.env[key] === undefined) {
        console.error("No such environment variable: " + key);
        process.exit(1);
      }

      instance[key] = Bun.env[key];
      return instance[key];
    },
  };
})();
