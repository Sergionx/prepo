import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Vacantes",
    path: "./vacancies",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    //submenu: true,
    // subMenuItems: [
    //   { title: "All", path: "/projects" },
    //   { title: "Web Development", path: "/projects/web-development" },
    //   { title: "Graphic Design", path: "/projects/graphic-design" },
    // ],
  },

  {
    title: "Preparador",
    path: "/preparer",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: "Account", path: "/settings/account" },
    //   { title: "Privacy", path: "/settings/privacy" },
    // ],
  },
  {
    title: "Inicio Sesión",
    path: "/login",
    icon: <Icon icon="lucide:login" width="24" height="24" />,
  },

  {
    title: "Registarse",
    path: "/signup",
    icon: <Icon icon="lucide:signup" width="24" height="24" />,
  },
];
