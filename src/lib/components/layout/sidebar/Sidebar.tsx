"use client";
import React, { useState } from "react";
import next from "next";
import { Icon, IconClipboard, IconLogin2 } from "@tabler/icons-react";
import Link from "next/link";

import { usePathname } from "next/dist/client/components/navigation";
import { SIDENAV_ITEMS } from "./messages/constants";
import { SideNavItem } from "./messages/types";

const Sidebar = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex  z-[99]">
      <div className="flex flex-col  w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          {/* <span className="h-7 w-7 bg-zinc-300 rounded-lg" /> */}

          <span className="font-bold text-2xl hidden md:flex">Prepo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div className="flex flex-col mt-auto p-4  md:w-60 ">
          <Link href="/login">
            {/* <IconLogin2 className="flex flex-col" width="28" height="28" /> */}
            <span className="flex flex-row font-semibold  text-xl rounded-lg text-center bg-slate-300  hover:bg-zinc-100 my-2 p-2 justify-center">
              Inicio de Sesión
            </span>
          </Link>
          <Link href="/signup">
            {/* <IconClipboard width="24" height="24" /> */}
            <span className="flex font-semibold text-xl rounded-lg  bg-slate-300  hover:bg-zinc-100 my-2 p-2 justify-center">
              Registro
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              {/* <Icon name="Chevron Abajo" width="24" height="24" /> */}
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
//       <button className={styles.togglebtn} onClick={toggleSidebar}>
//         {isOpen ? (
//           <span className="close-icon">X</span>
//         ) : (
//           <span className="open-icon">&#9776;</span>
//         )}
//       </button>
//       <nav>
//         <ul>
//           {links.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className={cn(
//                   styles.link,
//                   pathname === link.href && "font-bold"
//                 )}
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }
