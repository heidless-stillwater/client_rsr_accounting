import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutUsSection() {
  return (
    <section id="about-us" className="w-full py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 font-headline">About RSR Accounting</h2>
            <p className="text-lg text-muted-foreground mb-4">
              RSR Accounting is dedicated to providing top-tier accounting services with a focus on accuracy, reliability, and client satisfaction. Our mission is to empower businesses and individuals with clear financial insights and expert guidance.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We believe in building long-term relationships with our clients, understanding their unique financial landscapes, and offering personalized solutions. Our team of experienced professionals is committed to upholding the highest standards of integrity and excellence in all we do.
            </p>
            <p className="text-lg text-muted-foreground">
              Leveraging modern technology and innovative approaches, including AI-powered tools, we strive to make accounting seamless and efficient for you.
            </p>
          </div>
          <div className="md:w-1/2">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative w-full h-80 md:h-96">
                  <Image
                    src="https://storage.googleapis.com/rsr_about_live.jpg"
                    alt="About RSR Accounting"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="office team"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
