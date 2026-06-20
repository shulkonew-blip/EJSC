import {
  ShieldCheck,
  Award,
  Heart,
  Users,
  Megaphone,
  Flame,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LegendsBar from "@/components/LegendsBar";
import Marquee from "@/components/Marquee";
import HeritageTimeline from "@/components/HeritageTimeline";
import FutureSimulator from "@/components/FutureSimulator";
import SplitFeature from "@/components/SplitFeature";
import BentoGrid from "@/components/BentoGrid";
import EmotionBand from "@/components/EmotionBand";
import AdmissionWizard from "@/components/AdmissionWizard";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import AgentEtoile from "@/components/AgentEtoile";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05070a]">
      {/* Grille de fond subtile */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-[0.5] mask-fade-b" />

      <ScrollProgress />
      <Navbar />

      <Hero />

      <LegendsBar />

      <div className="mt-12 sm:mt-24">
        <Marquee />
      </div>

      <HeritageTimeline />

      <FutureSimulator />

      {/* Section Staff & Prestige */}
      <SplitFeature
        id="staff"
        image="/images/staff.jpg"
        imageSide="left"
        glow="emerald"
        eyebrow="Entre les mains des meilleurs"
        eyebrowIcon={<ShieldCheck className="h-3.5 w-3.5" />}
        title={
          <>
            Une structure,
            <br />
            <span className="text-gradient-gold">zéro compromis.</span>
          </>
        }
        body={
          <>
            Nos éducateurs ne sont pas de simples encadrants : ce sont des{" "}
            <span className="font-semibold text-white">mentors certifiés</span>,
            formateurs de talents, dévoués à transmettre la rigueur, le respect et
            la culture de la gagne qui caractérisent l&apos;Étoile.
          </>
        }
        bullets={[
          { icon: <Award className="h-4 w-4" />, text: "Coachs 100% diplômés" },
          { icon: <ShieldCheck className="h-4 w-4" />, text: "Suivi individualisé" },
          { icon: <Heart className="h-4 w-4" />, text: "Discipline & respect" },
          { icon: <Flame className="h-4 w-4" />, text: "Culture de la gagne" },
        ]}
      />

      {/* Section Fierté Parentale */}
      <SplitFeature
        image="/images/tribunes.jpg"
        imageSide="right"
        glow="gold"
        eyebrow="Sous les yeux de la communauté"
        eyebrowIcon={<Megaphone className="h-3.5 w-3.5" />}
        title={
          <>
            Vivez l&apos;émotion
            <br />
            <span className="text-gradient-gold">des grands matchs.</span>
          </>
        }
        body={
          <>
            À l&apos;Étoile, votre enfant n&apos;évolue pas dans l&apos;anonymat.
            Chaque week-end, rejoignez une communauté de parents passionnés, vibrez
            dans des tribunes pleines et offrez-lui l&apos;expérience unique de{" "}
            <span className="font-semibold text-white">
              jouer devant un public en feu.
            </span>
          </>
        }
        bullets={[
          { icon: <Users className="h-4 w-4" />, text: "Communauté de familles" },
          { icon: <Megaphone className="h-4 w-4" />, text: "Tribunes en effervescence" },
        ]}
      />

      <BentoGrid />

      <EmotionBand />

      <AdmissionWizard />

      <LocationMap />

      <Footer />

      {/* Assistant flottant — Agent Étoile */}
      <AgentEtoile />
    </main>
  );
}
