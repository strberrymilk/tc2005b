"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  { href: "#historia", label: "Historia" },
  { href: "#mision", label: "Misión & Visión" },
  { href: "#actividades", label: "Actividades" },
  { href: "#aliados", label: "Aliados" },
  { href: "#fotos", label: "Fotos" },
  { href: "#eventos", label: "Eventos" },
];

const DONATION_URL = "https://www.gofundme.com/es-mx";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a className="flex items-center gap-3" href="#" onClick={closeMenu}>
          <span
            className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full border border-base-300 bg-base-200"
            aria-label="Logo de Núcleo"
          >
            <Image
              src="/images/brand/logo.svg"
              alt=""
              fill
              sizes="44px"
              className="object-cover"
              priority
            />
          </span>
          <span className="text-xl font-bold text-black">Núcleo</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-1 text-sm font-semibold text-base-content">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="rounded-md px-3 py-2 transition hover:bg-secondary hover:text-secondary-content"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              className="btn btn-secondary btn-sm rounded-md shadow-none"
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Dona
            </a>
            <a className="btn btn-primary btn-sm rounded-md shadow-none" href="/ingresar">
              Ingresar
            </a>
          </div>
        </div>

        <button
          className="btn btn-ghost btn-square rounded-md shadow-none md:hidden"
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Abrir menú"
        >
          <span className="text-xl leading-none">☰</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-base-300 bg-base-100 px-4 py-4 md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-2 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  className="block rounded-md px-3 py-2 hover:bg-secondary hover:text-secondary-content"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-4 flex max-w-6xl gap-2">
            <a
              className="btn btn-secondary flex-1 rounded-md shadow-none"
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              Dona
            </a>
            <a className="btn btn-primary flex-1 rounded-md shadow-none" href="/ingresar" onClick={closeMenu}>
              Ingresar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
