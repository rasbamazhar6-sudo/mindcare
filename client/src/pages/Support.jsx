import { HiOutlineGlobeAlt, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import Container from "../components/ui/Container";
import SectionHeader from "../components/ui/SectionHeader";
import Card from "../components/ui/Card";
import { verifiedCrisisHelplines } from "../data/crisisHelplines";

const ngos = [
  {
    name: "Taskeen Health Initiative",
    desc: "National non-profit focused on mental health awareness and free tele-mental health support, plus public education and the Pakistan Mental Health Coalition directory.",
    site: "https://taskeen.org",
    contact: "Helpline 0316-8275336 (see seek-help page for hours & Dial 3)",
  },
  {
    name: "Rozan",
    desc: "Islamabad-based NGO working on gender, emotional health, and violence prevention since 1998; operates the Rozan Counseling Helpline and community programmes.",
    site: "https://rozan.org",
    contact: "0800-22444 · 0304-1111741 · helpline@rozan.org",
  },
  {
    name: "Umang — Mental Health Helpline",
    desc: "Lahore-registered initiative offering a dedicated mental health helpline; public-facing materials highlight 24/7 access and clinical oversight.",
    site: "https://www.umang.com.pk",
    contact: "0311-7786264 · info@umang.com.pk",
  },
  {
    name: "Baat Karo",
    desc: "Grassroots initiative focused on reducing stigma (“log kya kahenge”) and offering peer listening / signposting via WhatsApp, widely referenced in Pakistani media.",
    site: "https://wa.me/923355743344",
    contact: "WhatsApp 0335-5743344",
  },
];

const counseling = [
  {
    name: "Taskeen — free telephonic counselling",
    desc: "Scheduled telephonic sessions with trained mental health professionals; Taskeen states several free consultations before any means-based assessment—confirm current policy on their site.",
    site: "https://taskeen.org/seek-help/",
    contact: "0316-8275336",
  },
  {
    name: "Rozan — telephone & email counselling",
    desc: "Free toll-free line (standard mobile rates on the alternate number) plus structured email counselling for people who prefer writing; see Rozan’s helpline page for hours.",
    site: "https://rozan.org/rozan-counseling-helpline/",
    contact: "0800-22444 · helpline@rozan.org",
  },
  {
    name: "Pakistan Mental Health Coalition — service directory",
    desc: "Searchable directory of psychiatrists, psychologists, counsellors, support groups, and rehab centres across Pakistan (hosted with Taskeen’s coalition work).",
    site: "https://pakmh.com/service-providers/",
    contact: "Web directory",
  },
  {
    name: "Karwan-e-Hayat — Karachi psychiatric & rehab services",
    desc: "Established Karachi network (PCRC & Korangi centre) offering psychiatric consultation and rehabilitation; call UAN for appointments and ask about zakat-supported or subsidised options.",
    site: "https://keh.org.pk/contact/",
    contact: "UAN 021-111-534-111 · info@keh.org.pk",
  },
];

const wellness = [
  {
    name: "Taskeen — free online screenings",
    desc: "Confidential distress screening and WHO-5 well-being screening forms to help you decide whether to seek further professional support.",
    site: "https://taskeen.org/seek-help/",
    contact: "Linked from Seek Help (distress + well-being tests)",
  },
  {
    name: "Taskeen — wellness articles & programmes",
    desc: "Urdu/English articles, workplace wellness, and community mental health literacy from Taskeen’s wellness department.",
    site: "https://taskeen.org/wellness-department/",
    contact: "Web resources",
  },
  {
    name: "Rozan — publications & IEC material",
    desc: "Downloadable brochures, manuals, and videos on youth mental health, harassment, and psychosocial support produced for Pakistani audiences.",
    site: "https://rozan.org",
    contact: "Browse rozan.org resources section",
  },
];

function ResourceGrid({ title, sectionId, items }) {
  return (
    <section className="mt-16" aria-labelledby={sectionId}>
      <SectionHeader
        id={sectionId}
        eyebrow="Directory"
        title={title}
        align="left"
        className="mx-0 mb-8 max-w-2xl"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((org) => (
          <Card key={org.name}>
            <h3 className="font-display text-xl text-slate-900">{org.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{org.desc}</p>
            <dl className="mt-4 space-y-2 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <HiOutlineGlobeAlt className="mt-0.5 h-4 w-4 text-teal-600" aria-hidden />
                <div>
                  <dt className="sr-only">Website</dt>
                  <dd>
                    <a
                      className="underline decoration-teal-300 underline-offset-4 hover:text-teal-800"
                      href={org.site}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {org.site}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                {org.contact.includes("@") ? (
                  <HiOutlineMail className="mt-0.5 h-4 w-4 text-violet-600" aria-hidden />
                ) : (
                  <HiOutlinePhone className="mt-0.5 h-4 w-4 text-violet-600" aria-hidden />
                )}
                <div>
                  <dt className="sr-only">Contact</dt>
                  <dd>{org.contact}</dd>
                </div>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function Support() {
  return (
    <div className="py-14 md:py-20">
      <Container>
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700/90 dark:text-teal-400/90">
            Resources
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-slate-900 sm:text-5xl dark:text-slate-100">
            Support that meets you
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Pakistan-focused NGOs, free or low-cost helplines, and directories published by Pakistani mental health
            organizations. Always double-check numbers and hours on the official website before calling—especially in an
            emergency.
          </p>
        </header>

        <ResourceGrid sectionId="ngos-heading" title="Pakistani NGOs" items={ngos} />
        <ResourceGrid
          sectionId="counseling-heading"
          title="Free & subsidised care (phone / directory)"
          items={counseling}
        />
        <ResourceGrid
          sectionId="helplines-heading"
          title="Helplines & crisis lines (Pakistan)"
          items={verifiedCrisisHelplines}
        />
        <ResourceGrid sectionId="wellness-heading" title="Wellness & self-help (Pakistan)" items={wellness} />
      </Container>
    </div>
  );
}
