import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-7xl font-bold text-matrix-cyan">404</p>
      <h1 className="mb-4 mt-4 text-2xl font-bold">Signal lost</h1>
      <p className="mb-8 text-slate-400">
        The page you requested does not exist in the matrix.
      </p>
      <Link
        href="/"
        className="rounded-md border border-matrix-cyan px-5 py-2 text-matrix-cyan transition hover:bg-matrix-cyan/10"
      >
        Back to home
      </Link>
    </div>
  );
}
