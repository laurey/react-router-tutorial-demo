/**
 * @file configure/routes/getRouteConfig
 */

import patchRoutes from "./patchRoutes";
import getRouteConfigFromConfig from "./getRouteConfigFromConfig";

const getRouteConfig = (
  paths = {
    pagesPath: "src/pages",
  },
  config = {},
  onPatchRoute
) => {
  let routes = null;

  if (config.routes) {
    routes = getRouteConfigFromConfig(config.routes, paths.pagesPath);
  }

  patchRoutes(
    routes,
    config,
    process.env.NODE_ENV === "production",
    onPatchRoute
  );
  return routes;
};

export default getRouteConfig;
