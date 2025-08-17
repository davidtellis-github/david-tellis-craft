import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function titleCaseFromSlug(slug?: string) {
  if (!slug) return "Wedding verse";
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

const WorkCaseStudy: React.FC = () => {
  const { slug } = useParams();
  const productName = titleCaseFromSlug(slug);

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
      {/* Top Nav */}
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
               <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                Weddingverse — a shared workspace for couples, planners, and vendors that turns inspiration into booked services.
              </h1>
              <p className="mt-3 text-muted-foreground max-w-prose">
                Weddings are multi-stakeholder and decision-dense. Couples juggle boards, sheets, and chats; vendors get low-context leads. We built a guided workspace that compresses decisions into "packages," improving clarity and velocity under timeline.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Activation ▲X%",
                  "Time-to-book −Y%",
                  "Vendor reply rate ▲Z%",
                ].map((m) => (
                  <span key={m} className="text-xs font-medium bg-muted rounded-full px-3 py-1 border border-border">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <aside className="md:col-span-5">
              <div className="rounded-2xl border border-dashed border-border p-4 shadow-sm bg-card">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Role & Scope</div>
                <ul className="mt-2 text-sm leading-6">
                  <li><strong>Role:</strong> Lead Product Designer (IC + Strategy)</li>
                  <li><strong>Timeline:</strong> Q1–Q3 ’YY (≈ N weeks)</li>
                  <li><strong>Surfaces:</strong> Mobile • Web • Console</li>
                  <li><strong>Team:</strong> PM • Eng • Data • Ops</li>
                  <li><strong>Constraints:</strong> e.g., security sign‑off, cold‑start, multi‑cloud</li>
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
              <p className="mt-2 text-muted-foreground">The market is fragmented across inspiration, planning, and procurement. Couples feel overwhelmed, planners herd cats, vendors waste time qualifying. The business goal: prove marketplace liquidity fast and lift lead→book conversion in N weeks.</p>
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
                <li><strong>Couple:</strong> decide, align, and track budget without overwhelm.</li>
                <li><strong>Planner:</strong> coordinate vendors and approvals.</li>
                <li><strong>Vendor:</strong> receive qualified, context-rich leads.</li>
                <li className="italic text-muted-foreground">Anti‑goal: full CRM replacement.</li>
              </ul>
            </article>

            {/* Key Bet */}
            <article id="bet">
              <h2 className="text-lg font-semibold">Key Bet</h2>
              <p className="mt-2">If we center "decision packages" (brief → shortlist → trade-offs → book), we shorten time-to-book and raise vendor win-rate.</p>
              <div className="mt-3 rounded-xl border border-dashed border-border p-4 bg-muted">
                <div className="text-xs uppercase text-muted-foreground">Decision Log</div>
                <ul className="mt-2 text-sm list-disc pl-5">
                  <li>Decision → Rationale → Trade‑off</li>
                  <li>Decision → Rationale → Trade‑off</li>
                  <li>Decision → Rationale → Trade‑off</li>
                </ul>
              </div>
            </article>

            {/* How I Worked */}
            <article id="how">
              <h2 className="text-lg font-semibold">How I Worked</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "Research", "JTBD mapping", "Service blueprint", "IA", "Component library", "Flows", "Prototyping", "Delivery",
                ].map((chip) => (
                  <span key={chip} className="text-xs bg-muted px-3 py-1 rounded-full border border-border">{chip}</span>
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Weekly PM/Eng/BD triad; live vendor pilots.</p>
            </article>

            {/* Three Key Moments */}
            <article id="moments">
              <h2 className="text-lg font-semibold">Three Key Moments</h2>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {[
                  { title: "Cold-start", content: "Seeded \"starter briefs\" templates → activation ▲X%" },
                  { title: "Decision paralysis", content: "Compare-cards with 3 explicit trade-offs → time-to-decision −Y%" },
                  { title: "Vendor mismatch", content: "Structured brief + price bands → vendor reply rate ▲Z%" }
                ].map((moment, i) => (
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
                    <tr className="border-t border-border">
                      <td className="p-3">Shortlist prominence reduces bounce</td>
                      <td className="p-3">control vs. sticky shortlist</td>
                      <td className="p-3">bounce −x%</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Budget entry earlier increases realism</td>
                      <td className="p-3">onboarding order</td>
                      <td className="p-3">vendor acceptance ▲y%</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-3">Template library improves activation</td>
                      <td className="p-3">6 vs. 12 templates</td>
                      <td className="p-3">activation ▲z%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Outcomes */}
            <article id="outcomes">
              <h2 className="text-lg font-semibold">Outcomes</h2>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {[
                  ["Lead→book", "a% → a+Δ% in n weeks"],
                  ["Day-7 active couples", "b% → b+Δ%"],
                  ["Vendor response time", "th → t−Δh"],
                ].map(([title, caption]) => (
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
              <h2 className="text-lg font-semibold">What I’d Do Next</h2>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Price transparency experiments</li>
                <li>Vendor SLA nudges</li>
                <li>Planner pro tooling</li>
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
