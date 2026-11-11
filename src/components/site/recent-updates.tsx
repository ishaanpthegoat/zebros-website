import { teamUpdates } from "@/data/team-updates";

export function RecentUpdates() {
  return (
    <section className="container pb-12" aria-labelledby="recent-updates-title">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <span className="eyebrow">2026–2027 season</span>
        <h2 id="recent-updates-title" className="section-title">From design to the <span className="accent">field.</span></h2>
        <p className="section-sub">Build notes, team projects, and the next things we are working on. Updated November 10, 2026.</p>
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        {teamUpdates.map((update) => (
          <article key={update.id} id={update.id} className="scroll-mt-28 rounded-2xl border border-border bg-card/90 p-5 text-left sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider">
              <time dateTime={update.date} className="text-primary">{update.dateLabel}</time>
              <span className="text-muted-foreground">{update.category}</span>
            </div>
            <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">{update.title}</h3>
            <div className="space-y-3 text-base leading-relaxed text-muted-foreground">
              {update.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {update.photos && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {update.photos.map((photo) => (
                  <figure key={photo.src}>
                    <a href={photo.src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-border transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" aria-label={`Open photo: ${photo.alt}`}>
                      <img src={photo.src} alt={photo.alt} className="aspect-[3/4] w-full bg-background object-contain" loading="lazy" width="918" height="1224" />
                    </a>
                    <figcaption className="mt-2 text-sm leading-relaxed text-muted-foreground">{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
