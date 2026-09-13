import type { Metadata } from 'next';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const metadata: Metadata = {
  title: 'Theme',
  description: 'Customize your Neup.Group theme.',
};

export default function ThemePage() {
  return (
    <div className="flex flex-col">
      <section className="section-padding">
        <div className="container max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Preferences</p>
          <h1 className="font-headline text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
            Customize your theme.
          </h1>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed tracking-normal text-muted-foreground md:text-xl md:leading-8">
            Choose a theme color for your Neup.Group experience. Your selection is saved on this device.
          </p>
          <div className="mt-10 rounded-lg border bg-card p-5">
            <ThemeSwitcher />
          </div>
        </div>
      </section>
    </div>
  );
}
