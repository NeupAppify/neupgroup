import { Button } from "@neup/components/ui/button";
import { LinkButton } from '@neup/components/ui/link-button';
import Link from "next/link";
import { Handshake, Briefcase } from "lucide-react";

export function Partnerships() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Let's Build Together
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Whether you are an early believer, a strategic partner, or exceptional talent, there's a place for you at Neup Group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkButton size="lg" href="mailto:partner@neup.group">
                <Handshake className="mr-2 h-5 w-5" />
                Partner With Us
              </LinkButton>
            <LinkButton variant="secondary" size="lg" href="mailto:careers@neup.group">
                <Briefcase className="mr-2 h-5 w-5" />
                Explore Careers
              </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

undefined
undefined
undefined
