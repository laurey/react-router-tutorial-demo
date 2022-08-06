import { join, relative, isAbsolute } from "path";
import slash from "slash2";
import { cloneDeep } from "lodash";

let targetLevel = null;
let level = 0;

const routesToJSON = (routes, service) => {
  if (process.env.CODE_SPLITTING_LEVEL) {
    targetLevel = process.env.CODE_SPLITTING_LEVEL;
  } else {
    targetLevel = 1;
    const routesHaveChild = routes.filter(
      (route) => route.routes && route.routes.length
    );
    if (routesHaveChild.length) {
      targetLevel = 2;
    }
  }

  const { applyPlugins, paths } = service;
  const clonedRoutes = cloneDeep(routes);
  patchRoutes(clonedRoutes);

  return JSON.stringify(
    clonedRoutes,
    (key, value) => {
      switch (key) {
        case "component": {
          if (value.startsWith("() =>")) {
            return value;
          }

          const [component, webpackChunkName] = value.split("^^");
          const importPath = isAbsolute(component)
            ? component
            : slash(relative(paths.tmpDirPath, component));

          let ret = `require('${importPath}').default`;
          if (applyPlugins) {
            ret = applyPlugins.call(service, "modifyRouteComponent", {
              initialValue: ret,
              args: {
                importPath,
                webpackChunkName,
                component,
              },
            });
          }

          return ret;
        }
        case "Routes":
          return `[${value
            .map(
              (v) =>
                `require('${slash(
                  precedingDot(
                    relative(paths.absTmpDirPath, join(paths.cwd, v))
                  )
                )}').default`
            )
            .join(", ")}]`;
        default:
          return value;
      }
    },
    2
  );
};

function patchRoutes(routes, webpackChunkName) {
  level += 1;
  routes.forEach((route) => {
    patchRoute(route, webpackChunkName);
  });
  level -= 1;
}

function precedingDot(p) {
  return p.startsWith(".") ? p : `./${p}`;
}

export function normalizeEntry(entry) {
  return entry
    .replace(/^.(\/|\\)/, "")
    .replace(/(\/|\\)/g, "__")
    .replace(/\.jsx?$/, "")
    .replace(/\.tsx?$/, "");
}

function patchRoute(route, webpackChunkName) {
  if (route.component && !route.component.startsWith("() =>")) {
    if (!webpackChunkName || level <= targetLevel) {
      webpackChunkName = normalizeEntry(route.component || "commons_component")
        .replace(/^src__/, "")
        .replace(/^pages__/, "p__")
        .replace(/^page__/, "p__")
        .replace(/\$/g, "_");
    }
    route.component = [
      route.component || "commons_component",
      webpackChunkName,
      route.path,
    ].join("^^");
  }
  if (route.routes) {
    patchRoutes(route.routes, webpackChunkName);
  }
}

export default routesToJSON;
