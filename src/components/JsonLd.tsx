/** Injects JSON-LD structured data blocks into the page. */
export function JsonLd({ blocks }: { blocks: object[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(b) }}
        />
      ))}
    </>
  );
}
