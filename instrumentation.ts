export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { AbortSignal } = await import("node-abort-controller");

    // Increase fetch timeout globally to 60 seconds
    const originalFetch = global.fetch;
    global.fetch = async (input, init) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds

      try {
        const response = await originalFetch(input, {
          ...init,
          signal: init?.signal || controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    };
  }
}
