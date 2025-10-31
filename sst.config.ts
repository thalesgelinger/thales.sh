/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "thales-sh",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    const worker = new sst.cloudflare.Worker("GelingerDev", {
        handler: ".svelte-kit/cloudflare/_worker.js",
        assets: {
            directory: ".svelte-kit/cloudflare",
        },
        url: true,
        build: {
            minify: true,
        },
    });


    return {
        url: worker.url,
    };
  },
});
