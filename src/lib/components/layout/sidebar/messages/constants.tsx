import {
  IconFolder,
  IconHome,
  IconFileCheck,
  IconLogin2,
  IconClipboard,
  IconChalkboard,
} from "@tabler/icons-react";
import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Vacantes",
    path: "./vacancies",
    icon: <IconFileCheck width="24" height="24" />,
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
    icon: <IconChalkboard width="24" height="24" />,
  },
  // {
  //   title: "Inicio de Sesión",
  //   path: "/login",
  //   icon: <IconLogin2 width="28" height="28" />,
  //   // submenu: true,
  //   // subMenuItems: [
  //   //   { title: "Account", path: "/settings/account" },
  //   //   { title: "Privacy", path: "/settings/privacy" },
  //   // ],
  // },

  // {
  //   title: "Registarse",
  //   path: "/signup",
  //   icon: <IconClipboard width="24" height="24" />,
  // },
];
