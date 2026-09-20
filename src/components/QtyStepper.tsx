"use client";
export default function QtyStepper({
  qty,
  onChange,
  small = false,
}: {
  qty: number;
  onChange: (q: number) => void;
  small?: boolean;
}) {
  const btn = `flex items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:opacity-40 ${small ? "h-7 w-7" : "h-9 w-9"}`;
  return (
    <div className={`inline-flex items-center rounded-lg border border-slate-300 bg-white ${small ? "" : ""}`}>
      <button type="button" aria-label="Decrease quantity" className={btn} disabled={qty <= 1} onClick={() => onChange(qty - 1)}>−</button>
      <input
        aria-label="Quantity"
        className={`${small ? "h-7 w-8 text-xs" : "h-9 w-10 text-sm"} border-x border-slate-200 text-center font-semibold outline-none`}
        value={qty}
        readOnly
      />
      <button type="button" aria-label="Increase quantity" className={btn} onClick={() => onChange(Math.min(99, qty + 1))}>+</button>
    </div>
  );
}
