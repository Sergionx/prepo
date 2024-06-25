//import Icon from "@/lib/components/Icon";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/admin/cms",
    //icon: <Icon name="Home" width="28" height="28" />,
  },
  {
    title: "Secciones",
    path: "/projects",
    //icon: <Icon name="Folder" width="28" height="28" />,
    submenu: true,
    subMenuItems: [
      { title: "Finanzas", path: "/admin/cms/banco" },
      { title: "Bienes Raíces", path: "/admin/cms/Bienes-Raices" },
      { title: "Tecnología", path: "/admin/cms/tecnologia" },
    ],
  },
  {
    title: "Contactos",
    path: "/admin/cms/messages",
    //icon: <Icon name="Mail" width="28" height="28" />,
  },
  {
    title: "Logos",
    path: "/admin/cms/logos",
    //icon: <Icon name="Image" width="28" height="28" />,
  },
];
