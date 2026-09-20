import { rs } from "@/lib/format";

export default function Price({ price, compareAt, size = "base" }: { price: number; compareAt?: number; size?: "base" | "lg" }) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-2 ${size === "lg" ? "text-xl sm:text-2xl" : ""}`}>
      <span className={`font-bold ${compareAt ? "text-sale" : "text-slate-900"}`}>{rs(price)}</span>
      {compareAt && <span className="text-sm text-slate-400 line-through">{rs(compareAt)}</span>}
    </span>
  );
}
