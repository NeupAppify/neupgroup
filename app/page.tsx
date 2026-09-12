
import { Hero } from '@/components/sections/Hero';
import { CompanyOverview } from '@/components/sections/CompanyOverview';
import { VenturePortfolio } from '@/components/sections/VenturePortfolio';
import { Capabilities } from '@/components/sections/Capabilities';
import { Vision } from '@/components/sections/Vision';
import { Differentiation } from '@/components/sections/Differentiation';
import { Partnerships } from '@/components/sections/Partnerships';
import type { Metadata } from 'next';
import { OurClients } from '@/components/sections/OurClients';
import { getServerSession } from '@/lib/session';
import { HomeWelcome } from '@/components/sections/HomeWelcome';

export const metadata: Metadata = {
  title: 'Home',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const user = await getServerSession();

  return (
    <>
      <HomeWelcome user={user} />
      <Hero />
      <CompanyOverview />
      <VenturePortfolio />
      <Capabilities />
      <Vision />
      <Differentiation />
      <OurClients />
      <Partnerships />
    </>
  );
}
