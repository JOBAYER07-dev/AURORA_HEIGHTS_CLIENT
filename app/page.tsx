import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Residences from "@/components/Residences";
import PropertiesGrid from "@/components/PropertiesGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <Residences />
        <PropertiesGrid />
      </main>
      <Footer />
    </>
  );
}


