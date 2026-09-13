import { Button } from "@neup/components/ui/button";
import { LinkButton } from '@neup/components/ui/link-button';
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const heroImage = {
  src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  alt: "Team collaborating around a table with laptops",
};

export function Hero() {
  return (
    <section className="hero-section-padding relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 bg-secondary rounded-full right-0 bottom-0 translate-x-1/2 translate-y-1/2 blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="container px-4 md:px-6 relative">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col items-start space-y-6 text-left">
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-headline text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
                We build meaningful digital ventures.
              </h1>
              <p className="text-base font-normal leading-relaxed tracking-normal text-muted-foreground md:text-xl md:leading-8">
                Neup Group is a venture studio from Nepal, focused on building the next generation of products and platforms for a global audience.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <LinkButton variant="solid" size="lg" href="/about/ventures">
                  Explore Ventures
                  <MoveRight className="ml-2 h-5 w-5" />
                </LinkButton>
              <LinkButton variant="outline" size="lg" href="/contacts">
                  Contact Us
                </LinkButton>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-[2rem]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={1200}
                height={900}
                className="aspect-[4/3] h-full w-full rounded-[2rem] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

undefined
undefined
undefined
