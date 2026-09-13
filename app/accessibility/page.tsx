import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Accessibility preferences for Neup.Group.',
};

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col">
      <section className="section-padding">
        <div className="container max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Preferences</p>
          <h1 className="font-headline text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl/none">
            Accessibility
          </h1>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed tracking-normal text-muted-foreground md:text-xl md:leading-8">
            Accessibility preferences will be available here.
          </p>
        </div>
      </section>
    </div>
  );
}
