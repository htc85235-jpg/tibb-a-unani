import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { policies, byPolicySlug } from "@/lib/policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = byPolicySlug(slug);
  return { title: p ? p.title : "Policy" };
}

export default async function PolicyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = byPolicySlug(slug);

  if (!p) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="font-display text-2xl font-bold">Policy not found</h1>
        <Link href="/" className="btn-primary mt-5">Back to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="container-x max-w-3xl py-10">
      <Breadcrumbs trail={[{ label: p.title }]} />
      <h1 className="mt-5 font-display text-3xl font-bold text-slate-900">{p.title}</h1>
      <div className="mt-6 space-y-4 leading-7 text-slate-600">
        {p.body.map((b, i) => <p key={i}>{b}</p>)}
      </div>
    </div>
  );
}
