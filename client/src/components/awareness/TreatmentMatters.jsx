import { HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineClock } from "react-icons/hi";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import { treatmentPoints } from "../../data/recoveryStories";

const icons = [HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlineClock, HiOutlineAcademicCap, HiOutlineUserGroup];

export default function TreatmentMatters() {
  return (
    <section className="mt-20" aria-labelledby="treatment-heading">
      <SectionHeader
        id="treatment-heading"
        eyebrow="Pakistan context"
        title="Why mental health treatment matters"
        description="In our communities, mental health is often discussed quietly—but professional care is available, effective, and deeply human. Seeking therapy is a sign of wisdom, not weakness."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treatmentPoints.map((point, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Card
              key={point.title}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-sky-100 text-teal-800">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg text-slate-900">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.text}</p>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 border border-teal-100/80 bg-gradient-to-br from-teal-50/60 via-white/70 to-sky-50/60 p-6">
        <p className="text-sm leading-relaxed text-slate-700">
          <strong className="text-slate-900">For families in Pakistan:</strong> Supporting a loved one can mean listening
          without judgment, helping them book a psychologist, and knowing helplines like{" "}
          <strong>Umang (0311-7786264)</strong> and <strong>Taskeen (0316-8275336)</strong>. Treatment works best when
          shame is replaced with compassion.
        </p>
      </Card>
    </section>
  );
}
