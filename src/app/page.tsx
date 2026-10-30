import { Hero, Statement, TrustPanel } from "@/components/hero";
import { Contact, Footer, Services, TileRows, Work } from "@/components/sections";
import { Shelf } from "@/components/shelf";

export default function Home() {
  return (
    <main className="relative" style={{ overflowX: "clip" }}>
      <Hero />
      <Statement />
      <TrustPanel />
      <TileRows />
      <Services />
      <Work />
      <Shelf />
      <Contact />
      <Footer />
    </main>
  );
}
