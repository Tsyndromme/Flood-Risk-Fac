"use strict";
module.exports = {
  serverBuildTarget: "netlify",
  server: process.env.NETLIFY || process.env.NETLIFY_LOCAL ? "./server.js" : void 0,
  ignoredRouteFiles: ["**/.*"]
};
//# sourceMappingURL=remix.config.js.map
