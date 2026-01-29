import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "El Escuchante | Escucha filosófica y acompañamiento reflexivo",
  description: "Un espacio para escuchar lo que sientes. Acompañamiento filosófico, lectura de sentido y ruta clara de trabajo para tu bienestar interior.",
  keywords: ["escucha filosófica", "acompañamiento", "bienestar", "filosofía", "terapia alternativa"],
  icons: {
    icon: "/assets/uploaded_media_0.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${cormorantGaramond.variable} ${montserrat.variable} antialiased bg-[#F5EFE8] text-[#2C2C2C] overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
