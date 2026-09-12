import { notFound } from 'next/navigation';
import Link from 'next/link';
import { logica } from '@neup/logica';
import type { SitesMemberDirectoryItem, SitesMemberListResponseBody } from '@neup/logica/sites';

async function getMember(slug: string): Promise<SitesMemberDirectoryItem | undefined> {
  const response = await logica.sites().members.get();
  const body = response.body as SitesMemberListResponseBody;
  return body.success && Array.isArray(body.members)
    ? body.members.find((member) => member.slug === slug)
    : undefined;
}

export default async function MemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = await getMember(slug);
  if (!member) notFound();

  return (
    <main className="container py-20 md:py-28">
      <Link href="/about/team" className="text-sm text-muted-foreground hover:text-foreground">← Back to team</Link>
      <div className="mt-10 max-w-2xl">
        <div className="flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-7xl font-bold text-primary/60">
          {(member.name || 'N').charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-8 font-headline text-4xl font-bold tracking-tight">{member.name}</h1>
        <p className="mt-2 text-xl font-semibold text-primary">{member.role}</p>
        {member.email ? <p className="mt-6 text-muted-foreground">{member.email}</p> : null}
      </div>
    </main>
  );
}
