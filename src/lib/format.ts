export const rs = (n: number) =>
  "Rs." + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const rsShort = (n: number) => "Rs." + n.toLocaleString("en-US");
