import FancyLink from "../components/FancyLink";

const routes = [
  {
    name: "Home",
    component: FancyLink,
    hideInMenu: true,
    hideInSider: false,
    path: "/",
  },
  {
    name: "Topics",
    component: FancyLink,
    hideInMenu: true,
    hideInSider: false,
    path: "/topics",
  },
  {
    name: "Todos",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/todos",
  },
  {
    name: "NotFound",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/not-found",
  },
  {
    name: "Counter",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/counter",
  },
  {
    name: "Sign Up",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: true,
    path: "/signup",
  },
  {
    name: "MyHome",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/home",
  },
  {
    name: "Demo",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/demo",
  },
  {
    name: "LogIn",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/login",
  },
  {
    name: "Secret",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: false,
    path: "/secret",
  },
  {
    name: "Sign In",
    component: FancyLink,
    hideInMenu: false,
    hideInSider: true,
    path: "/signin",
  },
];

export default routes;
