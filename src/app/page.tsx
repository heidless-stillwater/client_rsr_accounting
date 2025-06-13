import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { AboutUsSection } from '@/components/about-us-section';
import { AiToolsSection } from '@/components/ai-tools-section';
import { ContactUsSection } from '@/components/contact-us-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <AboutUsSection />
        <AiToolsSection />
        <ContactUsSection />
      </main>
      <footer className="py-8 text-center text-muted-foreground">
        <div className="container mx-auto">
          © {new Date().getFullYear()} RSR Accounting. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
