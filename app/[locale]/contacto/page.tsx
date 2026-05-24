import type { Metadata } from "next";

import { ContactoView } from "./contacto-view";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué quieres construir. Respondemos rápido en WhatsApp, email o con cotización formal.",
};

export default function ContactoPage() {
  return <ContactoView />;
}
