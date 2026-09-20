import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-slate-900">Oops! This link seems to be broken.</h1>
      <p className="mt-2 text-slate-500">The page you are looking for may have been moved or no longer exists.</p>
      <Link href="/" className="btn-primary mt-7">Back to Homepage</Link>
    </div>
  );
}
