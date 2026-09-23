/* DUMMY policy pages content — original placeholder wording, to be replaced with
   client-approved legal text before launch. */

export type Policy = { slug: string; title: string; body: string[]; bodyUrdu?: string[] };

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    body: [
      "This Privacy Policy explains what information Tibb-a-Unani collects when you use our website, why we collect it, and how we keep it safe. By using this website you agree to the practices described here.",
      "We collect only the information needed to serve you: your name, phone number and delivery address when you place a Cash on Delivery order, and your email address if you choose to subscribe to our offers. We never sell, rent or trade your personal information to any third party.",
      "Order details may be shared with our delivery partners strictly for the purpose of shipping your parcel. Payment is collected in cash at your doorstep, so we never ask for your bank details or card numbers.",
      "You may ask us at any time to update or delete your information by contacting us through the details on our Contact Information page. We keep order records only as long as needed to serve warranties and legal requirements.",
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    bodyUrdu: [
      "آپ کی اطمینان ہمارے لیے سب سے اہم ہے۔ اگر مصنوعات خراب، لیک شدہ یا آپ نے جو آرڈر کیا تھا اس سے مختلف پہنچے تو براہِ کرم ڈیلیوری کے 7 دن کے اندر مصنوعات اور پیکجنگ کی تصاویر کے ساتھ ہم سے رابطہ کریں۔",
      "درست سمجھے جانے والے ہر کلیم پر ہم آپ کی اگلی ڈیلیوری پر وہی مصنوعات مفت تبدیل کر دیتے ہیں، یا پوری رقم واپس کر دیتے ہیں۔ خراب یا غلط مصنوعات کی واپسی کا کرایہ ہماری طرف سے ادا کیا جاتا ہے۔",
      "صفائی اور حفاظتی وجوہات کی بنا پر کھلی یا استعمال شدہ مصنوعات واپس نہیں ہو سکتیں، سوائے ان صورتوں کے جب وہ خراب یا نقصان دہ ہوں۔ بغیر کھلی کورسز اور ٹانکیں 7 دن کے اندر واپس کرنے پر رقم واپس کی جا سکتی ہے۔",
      "کیش آن ڈیلیوری آرڈرز کی رقم کلیم منظوری کے 7 کاروباری دنوں کے اندر بینک ٹرانسفر یا موبائل والیٹ کے ذریعے واپس کی جاتی ہے۔ کسی بھی سوال کے لیے واٹس ایپ پر ہم سے رابطہ کریں — +92 322 6644422",
    ],
    body: [
      "Your satisfaction matters to us. If a product reaches you damaged, leaking, or is not the item you ordered, please contact us within 7 days of delivery with photos of the item and packaging.",
      "For approved claims we offer a free replacement of the same product on your next delivery, or a full refund of the item value. Return shipping for damaged or wrong items is at our cost.",
      "For hygiene and safety reasons, opened or used products cannot be returned unless they are damaged or faulty. Courses and toners returned unopened within 7 days are eligible for refund.",
      "Refunds for Cash on Delivery orders are processed through bank transfer or mobile wallet within 7 working days of claim approval.",
    ],
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    bodyUrdu: [
      "ہم پورے پاکستان میں قابلِ اعتماد کوریئر پارٹنرز کے ذریعے ڈیلیور کرتے ہیں۔ آرڈر کی تصدیق کے بعد عام طور پر 24 سے 48 گھنٹوں کے اندر پارسل بھیج دیا جاتا ہے اور زیادہ تر شہروں میں 2 سے 4 کاروباری دنوں میں ڈیلیور ہو جاتا ہے، جبکہ دور دراز علاقوں میں 6 کاروباری دن لگ سکتے ہیں۔",
      "تمام آرڈرز پر کیش آن ڈیلیوری دستیاب ہے — رقم ادا کریں صرف اس وقت جب پارسل آپ کے ہاتھ میں ہو۔ ہر آرڈر پر ڈیلیوری مفت ہے۔",
      "پارسل بھیجنے سے پہلے ہماری ٹیم تصدیقی کال یا واٹس ایپ میسج بھیجتی ہے، اس لیے براہِ کرم آرڈر کرتے وقت اپنا درست فون نمبر لکھیں۔ اگر کورئیر تین کوششوں کے باوجود آپ تک نہ پہنچ سکے تو پارسل واپس ہمیں واپس آ جاتا ہے اور ہم آپ سے رابطہ کر کے دوبارہ بھیجنے کا بندوبست کرتے ہیں۔",
    ],
    body: [
      "We deliver all over Pakistan through trusted courier partners. Orders are usually dispatched within 24 to 48 hours of confirmation and reach most cities within 2 to 4 working days. Remote areas may take up to 6 working days.",
      "Cash on Delivery is available across Pakistan — you pay only when the parcel is in your hands. Delivery is free on all orders.",
      "You will receive a confirmation call or WhatsApp message before dispatch, so please make sure your phone number is correct when ordering. If a courier cannot reach you after three attempts, the parcel returns to us and we will contact you to re-ship.",
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    body: [
      "Welcome to Tibb-a-Unani. By browsing or ordering from this website you agree to these terms, which exist to keep the experience fair and safe for both sides.",
      "Our herbal products are traditional Unani preparations. They support wellbeing but are not a replacement for emergency or specialist medical treatment. If you are pregnant, nursing, or taking regular medication, please consult your physician or Hakeem before use.",
      "Prices are listed in Pakistani Rupees and may change without prior notice. Product photos on this website may be representative; natural products can vary slightly in colour and aroma from batch to batch.",
      "Misuse of this website — including false orders or abusive behaviour with our support staff — may result in order refusal. These terms are governed by the laws of Pakistan.",
    ],
  },
  {
    slug: "contact-information",
    title: "Contact Information",
    body: [
      "We love hearing from you. For order questions, product guidance or Hakeem advice, reach us through any of the channels below and we will respond during working hours.",
      "Phone / WhatsApp: +92 322 6644422 (10:00 am – 8:00 pm, Mon–Sat)",
      "Email: info@tibb-a-unani.com",
      "Address: Islamabad, Pakistan",
      "The fastest response is usually on WhatsApp — send us your question and our team replies with product suggestions, dosage guidance and order tracking updates.",
    ],
  },
  {
    slug: "legal-notice",
    title: "Legal Notice",
    body: [
      "Tibb-a-Unani is a herbal products brand. All content on this website — including text, graphics, logos and product descriptions — is the property of Tibb-a-Unani and may not be copied or reused without written permission.",
      "Our products are traditional Unani/herbal food supplements and topical preparations. Statements on this website describe traditional uses and are not evaluated as medical claims. Results can vary from person to person.",
      "Nothing on this website should be interpreted as a prescription. Always follow the dosage on the label or the advice of a qualified Hakeem. Keep all products out of the reach of children.",
      "If you believe any content on this website infringes your rights, please notify us with details and we will review and, if required, remove the content promptly.",
    ],
  },
];

export const byPolicySlug = (s: string) => policies.find((p) => p.slug === s);
