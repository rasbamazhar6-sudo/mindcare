/** Educational content only — not medical diagnosis. */

function entry(id, name, overview, symptoms, causes, coping, precautions, professional) {
  return { id, name, overview, symptoms, causes, coping, precautions, professional };
}

export const conditions = [
  entry(
    "depression",
    "Depression",
    "Persistent low mood and loss of interest are common in Pakistan, often worsened by financial stress, isolation, or major life changes. Treatment and support can help.",
    ["Low mood most days", "Loss of interest in work or family", "Sleep or appetite changes", "Fatigue or poor concentration", "Hopelessness or guilt"],
    ["Genetics and biology", "Chronic stress or unemployment", "Trauma or loss", "Medical conditions"],
    ["Small scheduled activities", "Regular sleep routine", "Brief walks or daylight", "Talk to a trusted person", "CBT with a licensed therapist"],
    ["Avoid self-blame", "Limit alcohol", "Seek urgent help for self-harm thoughts"],
    "If symptoms last two weeks or affect work, studies, or safety, see a psychiatrist or psychologist. Helplines: Umang 0311-7786264, Taskeen 0316-8275336."
  ),
  entry(
    "anxiety-disorder",
    "Anxiety Disorder",
    "Excessive worry, tension, and physical symptoms are frequent among students and professionals in high-pressure environments.",
    ["Restlessness", "Racing thoughts", "Muscle tension", "Sleep problems", "Panic-like sensations"],
    ["Stress and burnout", "Family or academic pressure", "Trauma", "Caffeine or stimulants"],
    ["Paced breathing", "Grounding (5-4-3-2-1 senses)", "Structured study/work blocks", "Therapy (CBT)"],
    ["Reduce doom-scrolling", "Avoid sudden medication changes without a doctor"],
    "When worry blocks daily life or causes panic attacks, consult a mental health professional."
  ),
  entry(
    "ocd",
    "OCD",
    "Intrusive thoughts and repetitive rituals can be distressing; specialized treatment is effective.",
    ["Intrusive thoughts", "Checking, washing, or counting rituals", "Need for reassurance", "Time lost to rituals"],
    ["Genetic factors", "Stress amplifying thoughts", "Learned short-term relief from rituals"],
    ["ERP with a trained therapist", "Delay rituals slightly", "Label thoughts as mental noise"],
    ["Do not attempt intensive ERP alone", "Avoid compulsive online searching"],
    "See a clinician experienced in OCD; medication may help under psychiatric care."
  ),
  entry(
    "ptsd",
    "PTSD",
    "After trauma (accidents, violence, disasters), flashbacks and hypervigilance may persist—common in conflict-affected and disaster-prone regions.",
    ["Intrusive memories", "Avoidance", "Hypervigilance", "Mood changes", "Sleep nightmares"],
    ["Trauma exposure", "Lack of early support", "Repeated adversity"],
    ["Trauma-informed therapy", "Grounding skills", "Stable daily routine", "Trusted support"],
    ["Process trauma slowly with a professional", "Prioritize safety if dissociation occurs"],
    "Seek specialized trauma care; Taskeen and hospital psychiatry services can guide referrals."
  ),
  entry(
    "bipolar",
    "Bipolar Disorder",
    "Episodes of elevated mood/energy and depressive lows require accurate diagnosis and long-term care.",
    ["Elevated mood or irritability", "Reduced sleep without fatigue", "Risky spending or speech", "Depressive episodes"],
    ["Genetic vulnerability", "Sleep disruption triggers", "Stress"],
    ["Regular sleep schedule", "Mood tracking", "Medication adherence if prescribed", "Relapse prevention therapy"],
    ["Do not stop psychiatric meds abruptly", "Involve family early if mania affects judgment"],
    "Psychiatric evaluation is essential; avoid self-diagnosis from online lists."
  ),
  entry(
    "adhd",
    "ADHD",
    "Attention and executive-function challenges affect students and professionals; support and treatment improve outcomes.",
    ["Difficulty focusing", "Forgetfulness", "Restlessness", "Time management struggles", "Impulsivity"],
    ["Neurodevelopmental differences", "Genetics", "Sleep deprivation worsening symptoms"],
    ["Timers and checklists", "Break tasks into small steps", "Body doubling or study groups", "Clinical assessment"],
    ["Full evaluation before labeling", "Stimulants only under medical supervision"],
    "A psychiatrist or psychologist can assess ADHD vs. anxiety, sleep issues, or stress."
  ),
  entry(
    "social-anxiety",
    "Social Anxiety",
    "Fear of judgment in social or academic settings is common where reputation (“izzat”) feels high-stakes.",
    ["Fear of embarrassment", "Avoiding gatherings or presentations", "Physical blushing or shaking", "Over-preparing then cancelling"],
    ["Past criticism or bullying", "Perfectionism", "Low social confidence"],
    ["Gradual exposure with support", "Challenge “log kya kahenge” thoughts", "Practice short social goals", "Therapy (CBT)"],
    ["Avoid alcohol as a social crutch", "Set realistic expectations"],
    "If avoidance limits education or career, seek counseling—many universities offer student support."
  ),
  entry(
    "panic-disorder",
    "Panic Disorder",
    "Sudden intense fear with physical symptoms can mimic medical emergencies and increase ER visits.",
    ["Racing heart", "Shortness of breath", "Dizziness", "Fear of losing control", "Avoidance of triggers"],
    ["Stress", "Hyperventilation", "Caffeine", "Underlying anxiety"],
    ["Slow exhale breathing", "Learn panic is time-limited", "Gradual exposure with therapist", "Rule out medical causes once"],
    ["Repeated ER visits without follow-up care can reinforce fear"],
    "A doctor can rule out cardiac issues; therapy reduces panic frequency."
  ),
  entry(
    "burnout",
    "Burnout",
    "Chronic workplace or caregiving overload without recovery leads to exhaustion and cynicism—common in competitive jobs and joint-family responsibilities.",
    ["Exhaustion", "Cynicism or detachment", "Reduced performance", "Irritability", "Sleep issues"],
    ["Long hours", "Unclear boundaries", "Financial pressure", "Lack of rest"],
    ["Set work/study boundaries", "Micro-breaks and hydration", "Delegate where possible", "Reconnect with non-work identity"],
    ["Burnout is not laziness", "Medical leave may be needed in severe cases"],
    "If unable to function for weeks, see a clinician; discuss workload with a supervisor if safe."
  ),
  entry(
    "academic-stress",
    "Academic Stress",
    "Board exams, university competition, and family expectations create intense pressure for students across Pakistan.",
    ["Exam anxiety", "Procrastination then cramming", "Sleep loss", "Headaches", "Fear of disappointing family"],
    ["High stakes exams", "Comparison with peers", "Limited coping skills", "Tuition/coaching load"],
    ["Study plans with breaks", "Sleep before exams", "Talk to a counselor", "Realistic goals with parents"],
    ["Avoid stimulant abuse", "Do not isolate completely before exams"],
    "School/university counselors and helplines (Umang, Taskeen) offer free guidance."
  ),
  entry(
    "family-trauma",
    "Family Trauma",
    "Conflict, emotional neglect, or violence within the home can leave lasting psychological effects across generations.",
    ["Hypervigilance at home", "Difficulty trusting", "Guilt or shame", "Anger outbursts", "Withdrawal"],
    ["Domestic conflict", "Emotional neglect", "Forced marriage or control", "Economic dependency"],
    ["Safety planning if violence present", "Trusted adult or NGO (e.g. Rozan)", "Therapy when safe", "Journaling privately"],
    ["Do not confront unsafe abusers alone", "Legal aid for domestic violence where available"],
    "Rozan helpline 0800-22444; hospital emergency for immediate danger; ongoing therapy when safe."
  ),
  entry(
    "emotional-isolation",
    "Emotional Isolation",
    "Feeling unseen or disconnected—even in crowded households or hostels—affects mood and motivation.",
    ["Loneliness", "Few confidants", "Feeling misunderstood", "Low motivation", "Increased screen time"],
    ["Migration for work/study", "Stigma around emotions", "Busy family schedules", "Social anxiety"],
    ["One small connection daily", "Join structured groups (sports, study)", "Volunteer locally", "Online peer support with caution"],
    ["Social media is not a substitute for human contact"],
    "If isolation lasts months with low mood, combine social steps with professional support."
  ),
  entry(
    "digital-addiction",
    "Digital Addiction",
    "Excessive gaming, scrolling, or short-form video use can disrupt sleep, studies, and relationships—especially among youth.",
    ["Hours online daily", "Neglected sleep or prayers/routines", "Irritability when offline", "Declining grades or work"],
    ["Algorithm-driven apps", "Escapism from stress", "Lack of offline hobbies"],
    ["Screen-time limits", "Phone-free bedroom", "Scheduled offline blocks", "Replace with movement or in-person meetups"],
    ["Sudden total bans can backfire—use gradual limits"],
    "If use is compulsive despite harm, counseling can address underlying anxiety or ADHD."
  ),
  entry(
    "sleep-disorders",
    "Sleep Disorders",
    "Poor sleep worsens mood and focus; shift work, load-shedding noise, and late screen use are common disruptors in Pakistan.",
    ["Trouble falling asleep", "Waking at night", "Daytime fatigue", "Irregular schedule", "Relying on sedatives"],
    ["Stress", "Caffeine late in day", "Screens at night", "Untreated anxiety or apnea"],
    ["Fixed wake time", "Dim lights before bed", "Cool, dark room", "Limit naps", "Medical check if snoring"],
    ["Avoid self-medicating with sedatives", "Treat underlying anxiety"],
    "See a doctor for persistent insomnia or suspected sleep apnea."
  ),
  entry(
    "workplace-stress",
    "Workplace Stress",
    "Toxic managers, unpaid overtime, job insecurity, and harassment contribute to chronic stress in urban workplaces.",
    ["Sunday-night dread", "Headaches", "Conflict with colleagues", "Burnout symptoms", "Absenteeism"],
    ["Unfair workload", "Harassment", "Job insecurity", "Commute fatigue"],
    ["Document incidents if harassed", "HR or labor rights where available", "Boundaries on hours", "Stress breaks", "Counseling"],
    ["Know workplace safety policies", "Seek legal advice for serious harassment"],
    "Combine workplace changes with mental health care if symptoms persist."
  ),
];

export const CONDITIONS_DISCLAIMER =
  "This information is educational and not a medical diagnosis. Always consult a qualified mental health professional for assessment and treatment.";
