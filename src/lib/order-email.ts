/* Owner email notifications via FormSubmit (formsubmit.co) — free, no backend needed.
   Every website email (order receipts + contact messages) is delivered to the owner's Gmail.
   NOTE: formsubmit.co requires a ONE-TIME activation — the very first submission sends an
   "Activate your form" email to OWNER_EMAIL; clicking that link once activates delivery forever. */
import { rs } from "@/lib/format";

export const OWNER_EMAIL = "tibbaunani@gmail.com";
const ENDPOINT = `https://formsubmit.co/${OWNER_EMAIL}`;

type OrderPayload = {
  id: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  name: string;
  phone: string;
  address: string;
  city: string;
  subscribe: boolean;
};

/* Submit via a classic HTML form POST into a hidden iframe.
   WHY NOT fetch(): formsubmit.co serves some responses with Cross-Origin-Resource-Policy:
   same-origin, so the browser blocks every cross-origin fetch read (ERR_BLOCKED_BY_RESPONSE)
   even in no-cors mode. A plain form POST always REACHES the server — the response simply
   lands unread in the hidden iframe, which is all we need for fire-and-forget notifications. */
function postViaHiddenForm(fields: Record<string, string>): boolean {
  try {
    if (typeof document === "undefined") return false;
    const frameId = "fs-notify-frame";
    let iframe = document.getElementById(frameId) as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = frameId;
      iframe.name = frameId;
      iframe.tabIndex = -1;
      iframe.setAttribute("aria-hidden", "true");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
    }
    const form = document.createElement("form");
    form.action = ENDPOINT;
    form.method = "POST";
    form.target = frameId;
    form.style.display = "none";
    for (const [k, v] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = k;
      input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => form.remove(), 5000); // submission is out; drop the temp form
    return true;
  } catch {
    return false;
  }
}

/* Professional order receipt for the owner — rendered as a clean HTML table by
   FormSubmit's "table" template (one row per field, items as separate rows). */
export async function sendOrderEmail(o: OrderPayload): Promise<boolean> {
  return postViaHiddenForm({
    _subject: `New Order ${o.id} — Tibb-e-Unani (Cash on Delivery)`,
    _template: "table",
    _captcha: "false",
    "Order ID": o.id,
    "Order Date": o.date,
    "Customer Name": o.name,
    "Phone Number": o.phone,
    City: o.city,
    "Delivery Address": o.address,
    ...Object.fromEntries(
      o.items.map((it, i) => [`Item ${i + 1}`, `${it.name}  |  Qty: ${it.qty}  |  ${rs(it.price * it.qty)}`]),
    ),
    Subtotal: rs(o.subtotal),
    Shipping: o.shipping === 0 ? "Free" : rs(o.shipping),
    "TOTAL (Cash on Delivery)": rs(o.total),
    "Payment Method": "Cash on Delivery",
    "Wants Offers (newsletter)": o.subscribe ? "Yes" : "No",
    Source: "Website order form — tibb-a-unani.pages.dev",
  });
}

/* Contact-page message — _replyto makes "Reply" in Gmail go straight to the sender. */
export async function sendContactEmail(name: string, email: string, msg: string): Promise<boolean> {
  return postViaHiddenForm({
    _subject: `Website Contact Message — ${name}`,
    _template: "table",
    _captcha: "false",
    _replyto: email,
    "Sender Name": name,
    "Sender Email": email,
    Message: msg.trim() || "(no message written)",
    Source: "Website contact form — tibb-a-unani.pages.dev",
  });
}
