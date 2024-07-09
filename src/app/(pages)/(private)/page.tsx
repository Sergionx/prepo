import React, { Suspense } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Skeleton from "./VacancyList/Skeleton";
import VacancyListFetch from "./VacancyList/VacancyListFetch";

export default function Homepage() {
  return (
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
  );
}
