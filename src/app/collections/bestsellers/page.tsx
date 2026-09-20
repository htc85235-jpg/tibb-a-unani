import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CollectionLayout from "@/components/CollectionLayout";
import { bestsellers } from "@/lib/products";

export const metadata: Metadata = { title: "Best Sellers" };

export default function BestSellers() {
  return (
    <>
      <div className="container-x pt-6"><Breadcrumbs trail={[{ label: "Best Sellers" }]} /></div>
      <CollectionLayout title="Our Best Herbal Products" items={bestsellers()} />
    </>
  );
}
