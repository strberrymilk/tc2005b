import Image from "next/image";
import Navbar from "@/components/Navbar";

const DONATION_URL = "https://www.gofundme.com/es-mx";
const INSTAGRAM_URL = "https://www.instagram.com/nucleo_qro/";
const LINKEDIN_URL = "https://www.linkedin.com/";
const CONTACT_EMAIL = "mailto:nucleo.queretaro@gmail.com";

const activities = [
  "Sesiones educativas cada sábado",
  "Curso de verano",
  "Escuela para padres",
];

const partners = [
  {
    name: "TECHO México",
    logo: "/images/site/partners/techo.svg",
    circular: false,
  },
  {
    name: "Scholas MX",
    logo: "/images/site/partners/scholas.jpg",
    circular: false,
  },
  {
    name: "Lazarus",
    logo: "/images/site/partners/lazarus.jpeg",
    circular: true,
  },
  {
    name: "REU",
    logo: "/images/site/partners/reu.jpeg",
    circular: true,
  },
  {
    name: "Croissanto",
    logo: "/images/site/partners/croissanto.jpg",
    circular: false,
  },
  {
    name: "FETEC QRO",
    logo: "/images/site/partners/fetec.jpeg",
    circular: true,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative isolate min-h-[78vh] overflow-hidden bg-neutral text-white">
          <Image
            src="/images/site/hero/Hero1.png"
            alt="Niñas, niños y voluntariado de Núcleo"
            fill
            sizes="100vw"
            className="object-cover opacity-55"
            priority
          />
          <div className="absolute inset-0 bg-neutral/45" />

          <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-20">
            <p className="mb-4 text-sm font-bold uppercase tracking-normal text-secondary">
              Proyecto educativo en Querétaro
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Bienvenidos a Núcleo
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium text-white sm:text-xl">
              Educación y comunidad para transformar El Chamizal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-secondary rounded-md" href="#historia">
                Conoce nuestra historia
              </a>
              <a className="btn border-white bg-white/10 text-white hover:bg-white hover:text-neutral rounded-md" href="#donar">
                Súmate
              </a>
            </div>
          </div>
        </section>

        <section id="historia" className="bg-base-100 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-primary">Historia de Núcleo</h2>
            <p className="mt-5 text-lg leading-8 text-base-content">
              Núcleo fue creado a través del ILO Project del Eugenio Garza Sada
              Leadership Program. Nació con la misión de transformar la comunidad
              de El Chamizal mediante la educación y el acompañamiento integral.
            </p>
          </div>
        </section>

        <section id="mision" className="bg-secondary px-6 py-16 text-secondary-content">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Misión</h2>
              <p className="mt-5 text-lg leading-8">
                Empoderar a niños, niñas y adolescentes de El Chamizal a través de
                la educación, el arte y el deporte, fomentando valores y habilidades
                para la vida.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Visión</h2>
              <p className="mt-5 text-lg leading-8">
                Un mundo donde todos tengan acceso a oportunidades equitativas,
                comenzando por nuestra comunidad.
              </p>
            </div>
          </div>
        </section>

        <section id="actividades" className="bg-base-100 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-primary">¿Qué hacemos?</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {activities.map((activity) => (
                <div
                  className="rounded-md border border-base-300 bg-base-200 p-5 font-bold"
                  key={activity}
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="aliados" className="bg-accent px-6 py-16 text-accent-content">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Aliados</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {partners.map((partner) => (
                <div
                  className="flex min-h-36 items-center justify-center"
                  key={partner.name}
                >
                  {partner.circular ? (
                    <div className="aspect-square w-24 overflow-hidden rounded-full">
                      <Image
                        src={partner.logo}
                        alt={`Logo de ${partner.name}`}
                        width={160}
                        height={160}
                        className="h-full w-full scale-105 object-cover"
                      />
                    </div>
                  ) : (
                    <Image
                      src={partner.logo}
                      alt={`Logo de ${partner.name}`}
                      width={220}
                      height={140}
                      className="h-24 w-full max-w-36 object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="fotos" className="bg-base-100 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-primary">Galería</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn btn-outline btn-primary rounded-md"
                href="https://drive.google.com/drive/folders/1cQ_0P_7yb0_kS9-_3WeTNCYDnXrLH40k?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clases 2025
              </a>
              <a
                className="btn btn-outline btn-primary rounded-md"
                href="https://drive.google.com/drive/folders/1xMJy5Vpq7vD0ResyxU98HsCx-8mx_Aud?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clases 2026
              </a>
            </div>
          </div>
        </section>

        <section id="eventos" className="bg-secondary px-6 py-16 text-secondary-content">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">Eventos</h2>
            <p className="mt-5 text-lg leading-8">
              Posada Navideña Comunitaria, Carrera con Causa, Hackathon
              Legislativo, Hult Prize, y más actividades comunitarias a lo largo
              del año.
            </p>
          </div>
        </section>

        <section id="donar" className="bg-base-100 px-6 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-primary">Dona</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8">
                Tu apoyo ayuda a sostener sesiones, materiales y experiencias
                educativas para niñas, niños y adolescentes.
              </p>
            </div>
            <a
              className="btn btn-primary rounded-md"
              href={DONATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quiero donar
            </a>
          </div>
        </section>
      </main>

      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Programas</h6>
          <a className="link link-hover" href="#actividades">
            Sesiones educativas
          </a>
          <a className="link link-hover" href="#actividades">
            Curso de verano
          </a>
          <a className="link link-hover" href="#actividades">
            Escuela para padres
          </a>
          <a className="link link-hover" href="#eventos">
            Eventos comunitarios
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Núcleo</h6>
          <a className="link link-hover" href="#historia">
            Historia
          </a>
          <a className="link link-hover" href="#mision">
            Misión & Visión
          </a>
          <a className="link link-hover" href="#aliados">
            Aliados
          </a>
          <a className="link link-hover" href="#fotos">
            Galería
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Participa</h6>
          <a
            className="link link-hover"
            href={DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Dona
          </a>
          <a className="link link-hover" href="/ingresar">
            Ingresar
          </a>
          <a className="link link-hover" href={CONTACT_EMAIL}>
            Contacto
          </a>
          <a
            className="link link-hover"
            href={DONATION_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero donar
          </a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-base-300 bg-base-100 text-sm font-bold text-primary">
            N
          </span>
          <p>
            Núcleo - Proyecto Educativo
            <br />
            Educación y comunidad para transformar El Chamizal.
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a
              aria-label="Instagram de Núcleo"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>
            <a
              aria-label="LinkedIn de Núcleo"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.7h4v11.8H3V9.7Zm6.2 0H13v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6v6.1h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.5h-4V9.7Z" />
              </svg>
            </a>
            <a aria-label="Correo de Núcleo" href={CONTACT_EMAIL}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4.2V18h16V8.2l-7.4 5.1a1 1 0 0 1-1.2 0L4 8.2ZM4.8 6l7.2 5 7.2-5H4.8Z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
