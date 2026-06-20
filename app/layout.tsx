import type { Metadata, Viewport } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "EJSC · L'Étoile de la Jeunesse Sportive de Casablanca | Académie de Football depuis 2016",
  description:
    "Depuis 2016, l'institution historique de Casablanca forme l'élite du football. École de Football (tous âges) & Académie de Performance (sur détection). Offrez à votre enfant un destin de champion, réservez son cours d'essai.",
  keywords: [
    "football Casablanca",
    "académie football",
    "école de foot Casablanca",
    "EJSC",
    "détection football Maroc",
  ],
  openGraph: {
    title: "EJSC · Depuis 2016, nous traçons la voie de l'élite",
    description:
      "Offrez à votre enfant un destin de champion. Académie de football historique de Casablanca.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable}`}>
      <head>
        {/* Applique le thème avant le paint pour éviter tout flash. Dark par défaut. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ejsc-theme');if(t==='light'){document.documentElement.classList.add('light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
