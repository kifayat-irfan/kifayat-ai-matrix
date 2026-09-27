import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kifayat AI Matrix.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <article className="mx-auto max-w-3xl py-12">
      <h1 className="mb-6 text-4xl font-extrabold">Contact</h1>
      <p className="mb-6 text-slate-300">
        Questions, tips, corrections, or partnership inquiries are always welcome.
      </p>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-slate-400">Name</label>
          <input
            type="text"
            required
            className="w-full rounded-md border border-matrix-cyan/30 bg-matrix-panel px-3 py-2 text-slate-100 focus:border-matrix-cyan focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-md border border-matrix-cyan/30 bg-matrix-panel px-3 py-2 text-slate-100 focus:border-matrix-cyan focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Message</label>
          <textarea
            rows={5}
            required
            className="w-full rounded-md border border-matrix-cyan/30 bg-matrix-panel px-3 py-2 text-slate-100 focus:border-matrix-cyan focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-matrix-cyan px-5 py-2 font-semibold text-matrix-bg transition hover:bg-cyan-300"
        >
          Send Message
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-500">
        This form is a placeholder. Wire it to your email or API once deployed.
      </p>
    </article>
  );
}
