import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Read the privacy policy, personal data protection terms and matrimonial member guidelines of Telangana State Arya Vysya Mahasabha.",
  path: "/privacy-policy",
});

const policies = [
  {
    number: "01",
    title: "వ్యక్తిగత వివరాల సేకరణ",
    subtitle: "Collection of Information",
    text: "వివాహ పరిచయ సేవలను అందించడానికి అవసరమైన పేరు, సంప్రదింపు వివరాలు, విద్య, వృత్తి, కుటుంబ వివరాలు మరియు సభ్యులు స్వచ్ఛందంగా అందించే ఇతర సంబంధిత సమాచారాన్ని సేకరించవచ్చు.",
  },
  {
    number: "02",
    title: "వివరాల వినియోగం",
    subtitle: "Use of Information",
    text: "సభ్యులు అందించిన వివరాలను Matrimony ID నిర్వహణ, వివాహ సంబంధాల పరిచయం, సభ్యుల నమోదు మరియు సంబంధిత సేవలను అందించడానికి ఉపయోగిస్తాము.",
  },
  {
    number: "03",
    title: "వివరాల గోప్యత",
    subtitle: "Confidentiality & Privacy",
    text: "సభ్యుల వ్యక్తిగత వివరాలను బాధ్యతాయుతంగా నిర్వహించడానికి మేము కట్టుబడి ఉన్నాము. అనుమతి లేదా చట్టబద్ధమైన కారణం లేకుండా వ్యక్తిగత వివరాలను అనవసరంగా ఇతరులతో పంచుకోము. ఇతర సభ్యుల ప్రొఫైల్ వివరాలను వారి అనుమతి లేకుండా సోషల్ మీడియాలో ప్రచురించకండి.",
  },
  {
    number: "04",
    title: "సభ్యుల బాధ్యతలు",
    subtitle: "Member Responsibilities",
    text: "మీ ప్రొఫైల్‌లో నిజమైన, పూర్తి మరియు తాజా వివరాలను అందించండి. ప్రతిపాదిత సంబంధం వివరాలను స్వయంగా ధృవీకరించుకోండి. కుటుంబ సభ్యులను నేరుగా కలిసిన తర్వాతే వివాహ నిర్ణయం తీసుకోండి. అపరిచితులకు డబ్బు, OTPలు లేదా బ్యాంక్ వివరాలను అందించవద్దు.",
  },
  {
    number: "05",
    title: "Matrimony ID – ముఖ్య సూచనలు",
    subtitle: "Important Matrimony Guidelines",
    text: "మీ Matrimony ID మరియు ప్రొఫైల్ వివరాలను భద్రంగా ఉంచుకోండి. వివరాల్లో ఏవైనా మార్పులు ఉంటే మహాసభకు తెలియజేయండి. అందిన వివాహ ప్రొఫైల్‌పై ఆసక్తి ఉన్నా లేకపోయినా మర్యాదపూర్వకంగా స్పందించండి.",
  },
  {
    number: "06",
    title: "వివాహం నిశ్చయమైనప్పుడు",
    subtitle: "Marriage Confirmation & Profile Removal",
    text: "వివాహ సంబంధం నిశ్చయమైన వెంటనే మహాసభకు తెలియజేయండి. మీ Matrimony ప్రొఫైల్‌ను నిలిపివేయడానికి లేదా తొలగించడానికి అభ్యర్థించండి. వివరాల తొలగింపు మహాసభ విధానం మరియు వర్తించే చట్టపరమైన అవసరాలకు అనుగుణంగా నిర్వహించబడుతుంది.",
  },
  {
    number: "07",
    title: "డేటా భద్రత",
    subtitle: "Data Security",
    text: "సభ్యుల సమాచారాన్ని అనధికారిక వినియోగం, మార్పులు లేదా బహిర్గతం నుంచి రక్షించడానికి తగిన సాంకేతిక మరియు నిర్వహణ చర్యలు తీసుకోవడానికి ప్రయత్నిస్తాము. ఇంటర్నెట్ ద్వారా సమాచార ప్రసారానికి సంపూర్ణ భద్రతకు హామీ ఇవ్వలేము.",
  },
  {
    number: "08",
    title: "Cookies & విధాన మార్పులు",
    subtitle: "Cookies & Policy Updates",
    text: "వెబ్‌సైట్‌లో అమల్లో ఉన్నట్లయితే, పనితీరు మరియు భద్రత కోసం అవసరమైన cookies లేదా సాంకేతిక సమాచారాన్ని ఉపయోగించవచ్చు. ఈ గోప్యతా విధానంలో మార్పులు చేసినప్పుడు తాజా వివరాలను ఈ పేజీలో ప్రచురించవచ్చు.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-gray-800">
      {/* Compact Page Header */}
      <header className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
          <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#a67816]">
            Telangana State Arya Vysya Mahasabha
          </p>

          <h1 className="text-center text-2xl font-bold text-[#800018] sm:text-3xl">
            గోప్యతా విధానం
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-6 text-gray-500">
            Privacy Policy & Matrimonial Member Guidelines
          </p>

          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#a67816]" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-7">
        {/* Introduction */}
        <section className="mb-5 rounded-xl border border-[#eadfce] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#800018]/[0.07] text-xl text-[#800018]">
              ♧
            </div>

            <div>
              <h2 className="text-base font-bold text-[#800018] sm:text-lg">
                మా గోప్యతా విధానానికి స్వాగతం
              </h2>
              <p className="mt-1.5 text-sm leading-7 text-gray-600">
                సభ్యుల వ్యక్తిగత సమాచారాన్ని గౌరవించడం మరియు బాధ్యతాయుతంగా
                నిర్వహించడం మా లక్ష్యం. ఈ విధానంలో సమాచారం సేకరణ, వినియోగం,
                భద్రత మరియు Matrimony సభ్యులు పాటించవలసిన ముఖ్య సూచనలు
                వివరించబడ్డాయి.
              </p>
            </div>
          </div>
        </section>

        {/* Section Heading */}
        <div className="mb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a67816]">
            Our Privacy Commitment
          </p>
          <h2 className="mt-1 text-xl font-bold text-[#800018] sm:text-2xl">
            గోప్యత & సభ్యుల మార్గదర్శకాలు
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            మా సేవలను ఉపయోగించే ముందు ఈ సూచనలను జాగ్రత్తగా చదవండి.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {policies.map((policy) => (
            <article
              key={policy.number}
              className="rounded-xl border border-[#eee4d5] bg-white p-4 shadow-sm transition duration-200 hover:border-[#c9a45c] hover:shadow-md sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#ead9b7] bg-[#fffaf0] text-xs font-bold text-[#800018]">
                  {policy.number}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-6 text-[#800018]">
                    {policy.title}
                  </h3>

                  <p className="mt-0.5 text-xs font-medium text-[#a67816]">
                    {policy.subtitle}
                  </p>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {policy.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-5 overflow-hidden rounded-xl border border-[#ead9b7] bg-white shadow-sm">
          <div className="h-1 bg-gradient-to-r from-[#690015] via-[#d9b76e] to-[#690015]" />

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#a67816]">
                We Are Here to Help
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#800018] sm:text-xl">
                మరింత సమాచారం కోసం సంప్రదించండి
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                మీ Matrimony ID, ప్రొఫైల్ వివరాలు లేదా గోప్యతకు సంబంధించిన
                సందేహాల కోసం మహాసభను సంప్రదించండి.
              </p>
            </div>

            <a
              href="mailto:noreply@aryavysyamahasabha.com"
              className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-[#800018] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012] focus:outline-none focus:ring-2 focus:ring-[#800018] focus:ring-offset-2"
            >
              Email Us <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="border-t border-[#eee4d5] bg-[#fffaf3] px-4 py-3 sm:px-5">
            <p className="break-all text-sm text-gray-700">
              <span className="font-semibold text-[#800018]">Email: </span>
              noreply@aryavysyamahasabha.com
            </p>
          </div>
        </section>

        {/* Closing Blessing */}
        <footer className="mt-5 rounded-xl border border-[#ead9b7] bg-gradient-to-r from-[#fffaf0] to-[#f7edda] px-4 py-5 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a67816]">
            With Divine Blessings
          </p>

          <p className="mt-2 text-base font-bold leading-7 text-[#800018] sm:text-lg">
            మా కులదైవం శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ఆశీస్సులతో
          </p>

          <p className="mt-1 text-lg" aria-label="Prayer">
            🙏
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Telangana State Arya Vysya Mahasabha
          </p>
        </footer>
      </div>
    </main>
  );
}