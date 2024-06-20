import React, { Suspense } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Skeleton from "./VacacyList/Skeleton";
import VacancyListFetch from "./VacacyList/VacancyListFetch";

import Sidebar from '@/app/sidebar';

export default function Homepage() {
  return (
    <>
      <header className="text-white py-4 px-6 flex justify-between items-center">
        <Navbar>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link className="hover:underline" href="#">
                Perfil
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="hover:underline" href="#">
                Postulaciones
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link className="hover:underline" href="#">
                Materias
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <Button as={Link} color="primary" href="#" variant="flat">
          Logout
        </Button>
      </header>

      <Sidebar />

      <main className="py-12 px-6">
        <div className="flex-grow px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Bienvenido a Prepo</h1>

            <Suspense fallback={<Skeleton />}>
              <VacancyListFetch />
            </Suspense>
          </div>
        </div>
      </main>

      {/* <main className="py-12 px-6">
        <Sidebar />
        <div className="flex-grow px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Bienvenido a Prepo</h1>

            <Suspense fallback={<Skeleton />}>
              <VacancyListFetch />
            </Suspense>
          </div>
        </div>
        
      </main> */}
    </>
  );
}
