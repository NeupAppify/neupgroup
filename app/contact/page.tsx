import type { Metadata } from 'next';
import { Briefcase, Handshake, Mail } from 'lucide-react';
import { LinkButton } from '@neup/components/ui/link-button';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Neup Group about partnerships, careers, and opportunities to build together.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="section-padding">
        <div className="container">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</p>
          <h1 className="max-w-4xl font-headline text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Let&apos;s build what matters.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground md:text-xl">
            Whether you have a partnership idea, want to join our team, or simply want to start a conversation, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <Handshake className="mb-5 h-8 w-8 text-primary" />
            <h2 className="font-headline text-xl font-semibold">Partnerships</h2>
            <p className="mt-2 text-muted-foreground">Explore ways to work with our ventures and build long-term value together.</p>
            <LinkButton className="mt-6" href="mailto:partner@neup.group">partner@neup.group</LinkButton>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Briefcase className="mb-5 h-8 w-8 text-primary" />
            <h2 className="font-headline text-xl font-semibold">Careers</h2>
            <p className="mt-2 text-muted-foreground">Bring your curiosity and craft to a team building the next generation of digital ventures.</p>
            <LinkButton className="mt-6" href="mailto:careers@neup.group">careers@neup.group</LinkButton>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <Mail className="mb-5 h-8 w-8 text-primary" />
            <h2 className="font-headline text-xl font-semibold">General enquiries</h2>
            <p className="mt-2 text-muted-foreground">Have a question or an idea? Send us a note and we&apos;ll get back to you.</p>
            <LinkButton className="mt-6" href="mailto:contact@neup.group">contact@neup.group</LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}
