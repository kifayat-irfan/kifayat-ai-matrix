import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MdComponentProps<T extends React.ElementType> = ComponentPropsWithoutRef<T> & {
  children?: ReactNode;
};

/** Anchor (a) used inside MDX. */
const Anchor = ({ children, ...rest }: MdComponentProps<"a">) => (
  <a
    href={rest.href}
    className="text-matrix-cyan hover:underline break-words"
    target={rest.target === "internal" ? undefined : "_blank"}
    rel={rest.target === "internal" ? undefined : "noopener noreferrer"}
  >
    {children}
  </a>
);

/** Paragraph. */
const P = ({ children }: { children?: ReactNode }) => (
  <p className="mb-4 leading-relaxed text-slate-300">{children}</p>
);

/** Headings. */
const H1 = ({ children }: { children?: ReactNode }) => (
  <h1 className="mb-6 text-3xl font-extrabold leading-tight sm:text-4xl">{children}</h1>
);
const H2 = ({ children }: { children?: ReactNode }) => (
  <h2 className="mb-4 mt-8 border-l-2 border-matrix-cyan pl-4 text-2xl font-bold">{children}</h2>
);
const H3 = ({ children }: { children?: ReactNode }) => (
  <h3 className="mb-3 mt-6 text-xl font-semibold">{children}</h3>
);

/** Blockquote. */
const Blockquote = ({ children }: { children?: ReactNode }) => (
  <blockquote className="mb-6 border-l-2 border-matrix-purple pl-5 text-slate-300 italic">
    {children}
  </blockquote>
);

/** List items. */
const Ul = ({ children }: { children?: ReactNode }) => (
  <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-300">{children}</ul>
);
const Li = ({ children }: { children?: ReactNode }) => (
  <li className="leading-relaxed">{children}</li>
);
const Strong = ({ children }: { children?: ReactNode }) => (
  <strong className="font-semibold text-slate-100">{children}</strong>
);

/** Inline code. */
const Code = ({ children, ...rest }: MdComponentProps<"code">) =>
  rest.className ? (
    <code className={rest.className}>{children}</code>
  ) : (
    <code className="rounded bg-matrix-panel px-1.5 py-0.5 text-matrix-cyan">{children}</code>
  );

/** Code block. */
const Pre = ({ children }: { children?: ReactNode }) => (
  <pre className="mb-4 overflow-x-auto rounded-lg border border-matrix-cyan/20 bg-matrix-panel p-4 text-sm">
    {children}
  </pre>
);

/** The component map passed to MDXRemote. */
export const MdxComponents = {
  a: Anchor,
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  blockquote: Blockquote,
  ul: Ul,
  li: Li,
  strong: Strong,
  code: Code,
  pre: Pre,
};

export { Anchor };
