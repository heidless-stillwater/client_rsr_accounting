import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="hero" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto flex max-w-[95%] flex-col items-center gap-12 px-4 md:flex-row md:px-6">
        <div className="relative w-full md:w-1/2 h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/rsr_accounting_about_live.jpg"
            alt="RSR Accounting Services"
            layout="fill"
            objectFit="cover"
            data-ai-hint="accounting finance"
          />
        </div>
        <div className="flex flex-col items-start space-y-6 text-left md:w-1/2">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-headline">
            Expert Accounting Solutions for Your Business
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            At RSR Accounting, we provide comprehensive accounting services tailored to meet your unique needs. Let us handle the numbers, so you can focus on growing your business.
          </p>
          <div className="flex space-x-4">
            <Link href="#ai-tools" passHref>
              <Button size="lg" variant="default">Explore AI Tools</Button>
            </Link>
            <Link href="#contact" passHref>
              <Button size="lg" variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
