import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AmbientSpotlight from "@/components/portfolio/AmbientSpotlight"


function titleCaseFromSlug(slug?: string) {
  if (!slug) return "Wedding Verse";
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

// Case study data for each project
const caseStudyData = {
  "wedding-verse": {
    title: "Wedding Verse",
    subtitle: "a shared workspace for couples, planners, and vendors",
    description: "Weddings are multi-stakeholder and decision-dense. Couples juggle boards, sheets, and chats; vendors get low-context leads. We built a guided workspace that compresses decisions into \"packages,\" improving clarity and velocity under timeline.",
    role: {
      role: "Lead Product Designer (IC + Strategy)",
      timeline: "Q1–Q3 '24 (≈ 12 weeks)",
      surfaces: "Mobile • Web • Console",
      team: "PM • Eng • Data • Ops",
      constraints: "security sign‑off, cold‑start, multi‑stakeholder"
    },
    context: "The market is fragmented across inspiration, planning, and procurement. Couples feel overwhelmed, planners herd cats, vendors waste time qualifying. The business goal: prove marketplace liquidity fast and lift lead→book conversion in 12 weeks.",
    users: [
      { role: "Couple", job: "decide, align, and track budget without overwhelm" },
      { role: "Planner", job: "coordinate vendors and approvals" },
      { role: "Vendor", job: "receive qualified, context-rich leads" }
    ],
    keyBet: "If we center \"decision packages\" (brief → shortlist → trade-offs → book), we shorten time-to-book and raise vendor win-rate.",
    howWorked: ["Research", "JTBD mapping", "Service blueprint", "IA", "Component library", "Flows", "Prototyping", "Delivery"],
    keyMoments: [
      { title: "Cold-start", content: "Seeded \"starter briefs\" templates → activation ▲35%" },
      { title: "Decision paralysis", content: "Compare-cards with 3 explicit trade-offs → time-to-decision −40%" },
      { title: "Vendor mismatch", content: "Structured brief + price bands → vendor reply rate ▲60%" }
    ],
    experiments: [
      { hypothesis: "Shortlist prominence reduces bounce", variant: "control vs. sticky shortlist", result: "bounce −15%" },
      { hypothesis: "Budget entry earlier increases realism", variant: "onboarding order", result: "vendor acceptance ▲25%" },
      { hypothesis: "Template library improves activation", variant: "6 vs. 12 templates", result: "activation ▲35%" }
    ],
    outcomes: [
      ["Lead→book", "12% → 18% in 12 weeks"],
      ["Day-7 active couples", "45% → 62%"],
      ["Vendor response time", "48h → 18h"]
    ],
    next: ["Price transparency experiments", "Vendor SLA nudges", "Planner pro tooling"]
  },
  "futurcraft-ai": {
    title: "Futurcraft AI",
    subtitle: "a brand-aligned AI content engine",
    description: "Content teams juggle multiple tools, struggle with brand consistency, and waste time repurposing across formats. Futurcraft AI set out to be a one-stop AI engine for branded, multi-format content creation.",
    role: {
      role: "Product Designer (Product Strategy + UI + Prototyping)",
      timeline: "Mar–Jun '25 (3 months)",
      surfaces: "Web App (Desktop-first, Mobile-responsive)",
      team: "PM, AI Engineer, Ops",
      constraints: "Early MVP, AI integration feasibility, speed-to-market"
    },
    context: "Content teams juggle multiple tools, struggle with brand consistency, and waste time repurposing across formats. Futurcraft AI set out to be a one-stop AI engine for branded, multi-format content creation.",
    users: [
      { role: "Marketer", job: "create branded content at scale without agencies" },
      { role: "Founder", job: "streamline thought leadership into multiple formats" },
      { role: "Designer/Writer", job: "save time by focusing on creativity, not formatting" }
    ],
    keyBet: "If we capture brand DNA upfront (tone, values, style) → we can ensure every AI-generated piece is consistent and on-brand → reducing edits and accelerating publishing.",
    howWorked: ["Workshops", "Journey Mapping", "Wireframes", "High-fidelity UI", "Prototyping", "Waitlist Campaign Assets"],
    keyMoments: [
      { title: "Brand DNA capture", content: "defining structure to \"teach\" AI brand context" },
      { title: "Multi-format creation", content: "blog → YouTube script → LinkedIn post" },
      { title: "Repurposing loop", content: "one idea → cross-platform outputs in clicks" }
    ],
    experiments: [
      { hypothesis: "Custom-trained AI = higher satisfaction", variant: "Generic LLM vs. tuned Futurcraft model", result: "Users rated output quality consistently 5⭐ vs 3⭐ baseline" }
    ],
    outcomes: [
      ["Waitlist signups", "300+ in first 2 weeks"],
      ["Prototype demo", "used for early investor pitch"],
      ["Content turnaround", "reduced average by 70%"]
    ],
    next: ["Build integrations (Notion, Canva, Webflow)", "Expand multi-user collaboration features", "Analytics on engagement impact of generated content"]
  },
  "turbocloud": {
    title: "Turbocloud",
    subtitle: "FinOps platform for monitoring & optimization",
    description: "Cloud cost management is fragmented across AWS, Azure, GCP. Businesses overspend due to lack of visibility + optimization insights. Turbocloud wanted to unify FinOps workflows into one console.",
    role: {
      role: "Lead Product Designer (Dashboards + Flows)",
      timeline: "Jan–Apr '25",
      surfaces: "Web Console",
      team: "PM, 2 Engineers, CIO stakeholder",
      constraints: "Heavy data, security sign-off, stepper CI/CD logic"
    },
    context: "Cloud cost management is fragmented across AWS, Azure, GCP. Businesses overspend due to lack of visibility + optimization insights. Turbocloud wanted to unify FinOps workflows into one console.",
    users: [
      { role: "Developer", job: "deploy through CI/CD with clarity" },
      { role: "CIO", job: "monitor spend & receive cost-saving suggestions" },
      { role: "Admin", job: "configure permissions, track usage" }
    ],
    keyBet: "If we simplify cost visibility + CI/CD workflows, we reduce waste and accelerate adoption.",
    howWorked: ["Stakeholder Interviews", "Flow Mapping", "Dashboard Wireframes", "Prototyping", "Usability Testing"],
    keyMoments: [
      { title: "Unified logs dashboard", content: "single view across all cloud providers" },
      { title: "Stepper-style CI/CD", content: "Dev → Preprod → Prod workflow clarity" },
      { title: "FinOps insight cards", content: "\"Close unused VMs → save $X\" recommendations" }
    ],
    experiments: [
      { hypothesis: "Visual spend breakdown = more action", variant: "Numeric tables vs. graphs", result: "Graphical view increased adoption of insights by 2.3×" }
    ],
    outcomes: [
      ["Waste detection", "CIOs could spot waste in <5 mins (previously hours)"],
      ["CI/CD clarity", "Developers rated clarity 8.5/10"],
      ["Stakeholder buy-in", "increased → moving toward MVP build"]
    ],
    next: ["Build recommendation engine for VM shutdowns", "Add alerts for CPU over/under utilization", "Role-based dashboard customization"]
  },
  "outrange": {
    title: "Outrange",
    subtitle: "Conceptual Product",
    description: "To balance my portfolio with creativity, I designed Outrange (a conceptual lifestyle app) that explores community-driven adventure planning.",
    role: {
      role: "Solo Designer",
      timeline: "Concept project, 4 weeks",
      surfaces: "Mobile-first",
      team: "Solo project",
      constraints: "Pure design exploration"
    },
    context: "To balance my portfolio with creativity, I designed Outrange (a conceptual lifestyle app) that explores community-driven adventure planning.",
    users: [
      { role: "Explorer", job: "discover new experiences" },
      { role: "Friend groups", job: "co-plan trips" },
      { role: "Vendors", job: "showcase experiences" }
    ],
    keyBet: "If we center on collaborative exploration, people find & commit to adventures faster.",
    howWorked: ["Sketching", "Rapid Wireframes", "Visual UI", "Motion Prototypes"],
    keyMoments: [
      { title: "Moodboard-driven discovery", content: "visual inspiration over text lists" },
      { title: "Group planning + polls", content: "collaborative decision making" },
      { title: "Interactive map UI", content: "spatial adventure discovery" }
    ],
    experiments: [
      { hypothesis: "Moodboards > lists for inspiration", variant: "Text vs. Visual planning", result: "Visual-first flow increased completion of plans by 2× (in tests)" }
    ],
    outcomes: [
      ["Design community", "Concept well-received by design peers"],
      ["Recognition", "Shortlisted in community showcases"],
      ["Portfolio impact", "Demonstrates creative range"]
    ],
    next: ["Explore AR integration for immersive previews", "Test MVP with a small user base"]
  }
};

const WorkCaseStudy: React.FC = () => {
  const { slug } = useParams();
  const data = slug ? caseStudyData[slug as keyof typeof caseStudyData] : caseStudyData["wedding-verse"];
  const productName = data?.title || titleCaseFromSlug(slug);

  // Simple SEO: title, description, canonical
  useEffect(() => {
    const title = `${productName} – Case Study`;
    document.title = title;

    const descText = `${productName}: Case study overview, role & scope, context, jobs, key bet, process, experiments, outcomes.`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", descText);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, [productName]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AmbientSpotlight/>{/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 lg:px-10 py-3 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-border hover:bg-muted text-sm"
            aria-label="Back to work"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </Link>
          <div className="font-semibold tracking-tight">Case Study · 0→1</div>
        </div>
      </header>

      {/* Page Body */}
      <main className="container mx-auto px-6 lg:px-10 pb-24">
        {/* HERO */}
        <section id="hero" className="pt-8 md:pt-12">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="md:col-span-7">
               <h1 className="text-2xl md:text-4xl font-medium tracking-tight">
                {data.title} — {data.subtitle}
              </h1>
              <p className="mt-3 text-muted-foreground max-w-prose">
                {data.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.outcomes.map(([metric, value]) => (
                  <span key={metric} className="text-xs font-medium bg-muted rounded-full px-3 py-1 border border-border">
                    {metric}: {value}
                  </span>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5">
              <div className="rounded-2xl border border-dashed border-border p-4 shadow-sm bg-card">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Role & Scope</div>
                <ul className="mt-2 text-sm leading-6">
                  <li><strong>Role:</strong> {data.role.role}</li>
                  <li><strong>Timeline:</strong> {data.role.timeline}</li>
                  <li><strong>Surfaces:</strong> {data.role.surfaces}</li>
                  <li><strong>Team:</strong> {data.role.team}</li>
                  <li><strong>Constraints:</strong> {data.role.constraints}</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* TWO‑COLUMN NARRATIVE + EVIDENCE */}
        <section className="mt-10 grid md:grid-cols-12 gap-6 md:gap-8">
          {/* Left: Narrative */}
          <div className="md:col-span-7 space-y-8">
            {/* Context */}
            <article id="context">
              <h2 className="text-lg font-semibold">Context</h2>
              <p className="mt-2 text-muted-foreground">{data.context}</p>
              <div className="mt-3 grid sm:grid-cols-3 gap-2">
                {[
                  "Audience",
                  "Problem",
                  "Business Goal",
                ].map((t) => (
                  <div key={t} className="rounded-xl border border-dashed border-border p-3 text-sm bg-card">
                    <div className="text-muted-foreground text-xs uppercase">{t}</div>
                    <div className="mt-1 h-10 bg-muted rounded-md" />
                  </div>
                ))}
              </div>
            </article>

            {/* Users & Jobs */}
            <article id="jobs">
              <h2 className="text-lg font-semibold">Users & Jobs</h2>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                {data.users.map((user, i) => (
                  <li key={i}><strong>{user.role}:</strong> {user.job}.</li>
                ))}
              </ul>
            </article>

            {/* Key Bet */}
            <article id="bet">
              <h2 className="text-lg font-semibold">Key Bet</h2>
              <p className="mt-2">{data.keyBet}</p>
            </article>

            {/* How I Worked */}
            <article id="how">
              <h2 className="text-lg font-semibold">How I Worked</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.howWorked.map((chip) => (
                  <span key={chip} className="text-xs bg-muted px-3 py-1 rounded-full border border-border">{chip}</span>
                ))}
              </div>
            </article>

            {/* Three Key Moments */}
            <article id="moments">
              <h2 className="text-lg font-semibold">Three Key Moments</h2>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {data.keyMoments.map((moment, i) => (
                  <div key={i} className="rounded-2xl border border-dashed border-border p-3 bg-card">
                    <div className="h-24 bg-muted rounded-lg" />
                    <div className="mt-2 text-sm">
                      <div className="font-medium">{moment.title}</div>
                      <div className="text-muted-foreground">{moment.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Experiments */}
            <article id="experiments">
              <h2 className="text-lg font-semibold">Experiments</h2>
              <div className="mt-3 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-muted-foreground">
                    <tr>
                      <th className="text-left p-3">Hypothesis</th>
                      <th className="text-left p-3">Variant</th>
                      <th className="text-left p-3">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.experiments.map((exp, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-3">{exp.hypothesis}</td>
                        <td className="p-3">{exp.variant}</td>
                        <td className="p-3">{exp.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Outcomes */}
            <article id="outcomes">
              <h2 className="text-lg font-semibold">Outcomes</h2>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {data.outcomes.map(([title, caption]) => (
                  <div key={title} className="rounded-2xl border border-dashed border-border p-4 bg-card">
                    <div className="h-20 bg-muted rounded-lg" />
                    <div className="mt-2 text-sm">
                      <div className="font-medium">{title}</div>
                      <div className="text-muted-foreground">{caption}</div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Next */}
            <article id="next">
              <h2 className="text-lg font-semibold">What I'd Do Next</h2>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {data.next.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          {/* Right: Evidence Rail */}
          <aside className="md:col-span-5 space-y-6">
            {/* System Snapshot */}
            <section id="system" className="rounded-2xl border border-dashed border-border p-4 bg-muted">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">System Snapshot</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-16 bg-card rounded-lg border border-border" />
                <div className="h-16 bg-card rounded-lg border border-border" />
                <div className="h-16 bg-card rounded-lg border border-border" />
                <div className="h-16 bg-card rounded-lg border border-border" />
                <div className="h-16 bg-card rounded-lg border border-border" />
                <div className="h-16 bg-card rounded-lg border border-border" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Tokens: brand neutrals + accent<br/>Components: checklist, shortlist, compare cards<br/>Objects: budget, vendor, decision<br/>Flows: inspiration → brief → shortlist → book</p>
            </section>

            {/* Prototype / Before-After */}
            <section className="rounded-2xl border border-dashed border-border p-4 bg-muted">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Prototype / Before ↔ After</div>
              <div className="mt-3 relative overflow-hidden rounded-xl border border-border bg-card aspect-[4/3] grid place-items-center">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="border-r border-border grid place-items-center text-sm text-muted-foreground">Before</div>
                  <div className="grid place-items-center text-sm text-muted-foreground">After</div>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4">
                  <input type="range" min="0" max="100" defaultValue="50" className="w-full" aria-label="Comparison slider (decorative)" />
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Tip: replace with a GIF or live prototype.</p>
            </section>

            {/* Constraint Cards */}
            <section className="rounded-2xl border border-dashed border-border p-4 bg-muted">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Constraints</div>
              <div className="mt-3 grid sm:grid-cols-3 gap-2 text-sm">
                {[
                  "Team: 2 Eng, 1 PM",
                  "Timeline: 9 wks",
                  "Risk: Security sign‑off",
                ].map((c) => (
                  <div key={c} className="rounded-xl bg-card border border-border p-3">{c}</div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        {/* Credits & Receipts */}
        <section id="credits" className="mt-12">
          <h2 className="text-lg font-semibold">Credits</h2>
          <p className="mt-2 text-muted-foreground text-sm">PM [name], Eng [names], Ops [name]</p>
        </section>

        <section id="receipts" className="mt-6">
          <h2 className="text-lg font-semibold">Receipts</h2>
          <ul className="mt-2 text-sm text-primary underline underline-offset-2">
            <li><a href="#">Figma (redacted)</a></li>
            <li><a href="#">Prototype GIF</a></li>
            <li><a href="#">Release Notes</a></li>
          </ul>
          <div className="mt-8 text-xs text-muted-foreground">NDA note: Replace exact metrics with ranges if needed.</div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-6 lg:px-10 py-8 text-sm text-muted-foreground">
          One‑page case study wireframe · Duplicate this page per product.
        </div>
      </footer>
    </div>
  );
};

export default WorkCaseStudy;