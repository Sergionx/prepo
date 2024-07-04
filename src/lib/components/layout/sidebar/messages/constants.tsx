import {
  IconFolder,
  IconHelpCircle,
  IconHome,
  IconMail,
  IconSettings,
} from "@tabler/icons-react";
import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Projects",
    path: "./projects",
    icon: <IconFolder width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "All", path: "/projects" },
      { title: "Web Development", path: "/projects/web-development" },
      { title: "Graphic Design", path: "/projects/graphic-design" },
    ],
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <IconMail width="24" height="24" />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IconSettings width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Account", path: "/settings/account" },
      { title: "Privacy", path: "/settings/privacy" },
    ],
  },
  {
    title: "Help",
    path: "/help",
    icon: <IconHelpCircle width="24" height="24" />,
  },
];
