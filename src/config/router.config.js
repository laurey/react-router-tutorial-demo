import Loadable from "react-loadable";

import Loading from "../components/Loading";

const routes = [
  {
    path: "/demo",
    // component: "../layouts/DemoLayout",
    component: Loadable({
      loader: () => import("../layouts/DemoLayout"),
      loading: Loading,
    }),
    // Routes: ["src/pages/Authorized"],
    // Routes: [
    //   Loadable({
    //     loader: () => import("../pages/Authorized"),
    //     loading: Loading,
    //   }),
    // ],
    routes: [
      { path: "/demo", redirect: "/demo/workplace" },
      {
        name: "DemoWorkplace",
        icon: "application",
        path: "/demo/workplace",
        // component: "./Demo/Workplace",
        component: Loadable({
          loader: () => import("../pages/Demo/Workplace"),
          loading: Loading,
        }),
      },
      {
        name: "DemoView",
        icon: "application",
        path: "/demo/viewlist",
        // component: "./Demo/ViewList",
        component: Loadable({
          loader: () => import("../pages/Demo/ViewList"),
          loading: Loading,
        }),
      },
      {
        // component: "404",
        component: Loadable({
          loader: () => import("../components/Exception"),
          render(loaded, props) {
            let Component = loaded.namedExport;
            return (
              <Component type="404" {...props}>
                <div>loadable: 404 not found!!!</div>
              </Component>
            );
          },
          loading: Loading,
        }),
      },
    ],
  },
  {
    path: "/",
    // component: "../layouts/BasicLayout",
    component: Loadable({
      loader: () => import("../layouts/BasicLayout"),
      loading: Loading,
    }),
    routes: [
      { path: "/", redirect: "/dashboard" },
      {
        name: "Dashboard",
        icon: "google",
        path: "/dashboard",
        component: Loadable({
          loader: () => import("../pages/Dashboard"),
          loading: Loading,
        }),
        routes: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            // component: "./Dashboard/Analysis",
            component: Loadable({
              loader: () => import("../pages/Dashboard/Analysis"),
              loading: Loading,
            }),
          },
          {
            path: "/dashboard/center",
            name: "center",
            hideInMenu: true,
            // component: "./Dashboard/Center",
            component: Loadable({
              loader: () => import("../pages/Dashboard/Center"),
              loading: Loading,
            }),
          },
        ],
      },
      {
        name: "Monitor",
        icon: "twitter",
        path: "/monitor",
        component: Loadable({
          loader: () => import("../pages/Monitor"),
          loading: Loading,
        }),
        hideChildrenInMenu: true,
        routes: [
          {
            path: "/monitor/aa",
            name: "ma",
            component: Loadable({
              loader: () => import("../pages/Monitor/AA"),
              loading: Loading,
            }),
          },
          {
            path: "/monitor/bb",
            name: "mb",
            component: Loadable({
              loader: () => import("../pages/Monitor/BB"),
              loading: Loading,
            }),
          },
        ],
      },
      {
        // component: "404",
        component: Loadable({
          loader: () => import("../components/Exception"),
          render(loaded, props) {
            let Component = loaded.namedExport;
            return (
              <Component type="404" {...props}>
                <div>another loadable: 404 not found!!!</div>
              </Component>
            );
          },
          loading: Loading,
        }),
      },
    ],
  },
];

export default routes;
