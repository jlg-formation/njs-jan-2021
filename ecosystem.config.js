module.exports = {
  apps: [
    {
      script: "back/server.js",
      name: "gestion-stock",
      env: {
        NODE_ENV: "production",
        NJS_SERVER_PORT: "5000",
      },
    },
  ],
};
