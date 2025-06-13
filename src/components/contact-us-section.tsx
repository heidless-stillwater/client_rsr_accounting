import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

export function ContactUsSection() {
  const contactDetails = [
    { icon: <MapPin className="h-6 w-6 text-primary" />, text: "17 Colina Mews, Harringay Ladder, London N15 3HS", href: "https://maps.google.com/?q=17+Colina+Mews,+Harringay+Ladder,+London+N15+3HS" },
    { icon: <Globe className="h-6 w-6 text-primary" />, text: "www.rsraccounting.co.uk", href: "http://www.rsraccounting.co.uk/" },
    { icon: <Mail className="h-6 w-6 text-primary" />, text: "test@test.com", href: "mailto:test@test.com" },
    { icon: <Phone className="h-6 w-6 text-primary" />, text: "07484928374", href: "tel:07484928374" },
  ];

  return (
    <section id="contact" className="w-full py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center font-headline">Contact Us</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative w-full h-80 md:h-96">
                  <Image
                    src="/images/rsr_accounting_about_live.jpg"
                    alt="RSR Accounting Contact"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="accounting office"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:w-1/2 space-y-6">
            <p className="text-lg text-muted-foreground">
              We're here to help with all your accounting needs. Reach out to us through any of the channels below, or visit our office.
            </p>
            {contactDetails.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group"
              >
                {item.icon}
                <span className="text-lg group-hover:text-primary transition-colors">{item.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
