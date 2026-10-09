import type { Dictionary } from '@/content/en';

type Legal = Dictionary['legal']['privacy'];

export function LegalPage({ data }: { data: Legal }) {
  return (
    <section className="legal">
      <div className="container legal__inner">
        <h1 className="t-h2">{data.title}</h1>
        <p className="legal__note">{data.updated}</p>
        {data.sections.map((section) => (
          <div key={section.heading} className="legal__section">
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
