import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CollectionLayout from "@/components/CollectionLayout";
import { products } from "@/lib/products";

export const metadata: Metadata = { title: "Catalog" };

export default function AllProducts() {
  return (
    <>
      <div className="container-x pt-6"><Breadcrumbs trail={[{ label: "Catalog" }]} /></div>
      <CollectionLayout title="Products" items={products} />
    </>
  );
}
