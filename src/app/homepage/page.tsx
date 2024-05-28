"use client";

import React from "react";
import {Navbar, NavbarContent, NavbarItem, Link, Button, CardBody, Card} from "@nextui-org/react";


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
        <Button as={Link} color="primary" href="#" variant="flat" >
          Logout
        </Button>
      </header>
      <main className="py-12 px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Bienvenido a Prepo</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <img
                alt="Facultad de Ingenieria"
                className="w-full h-48 object-cover rounded-t-lg"
                height="300"
                src="/facultad_ing.png"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width="400"
              />
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">Algoritmos y Programacion</h3>
                <p className="text-gray-500">Conoce tus preparadores</p>
              </CardBody>
            </Card>
            <Card>
              <img
                alt="Facultad de Ciencias"
                className="w-full h-48 object-cover rounded-t-lg"
                height="300"
                src="/facultad_ciencias.jpg"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width="400"
              />
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">Psicopatologia I</h3>
                <p className="text-gray-500">Conoce a tus preparadores</p>
              </CardBody>
            </Card>
            <Card>
              <img
                alt="Facultad de Ingenieria"
                className="w-full h-48 object-cover rounded-t-lg"
                height="300"
                src="/facultad_ing.png"
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width="400"
              />
              <CardBody>
                <h3 className="text-lg font-semibold mb-2">Fisica II</h3>
                <p className="text-gray-500">Conoce a tus preparadores</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
