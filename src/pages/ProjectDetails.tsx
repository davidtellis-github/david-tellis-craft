import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Github, Figma } from "lucide-react";

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();

  // Sample project data - replace with real data
  const project = {
    title: "Wedding Verse",
    subtitle: "A shared workspace for couples, planners, and vendors",
    description: "Weddings are multi-stakeholder and decision-dense. Couples juggle boards, sheets, and chats; vendors get low-context leads. We built a guided workspace that compresses decisions into 'packages,' improving clarity and velocity under timeline.",
    
    role: {
      title: "Lead Product Designer",
      duration: "Q1–Q3 '24 (≈ 12 weeks)",
      team: "PM • Eng • Data • Ops",
      tools: ["Figma", "Principle", "React", "Supabase"]
    },

    context: {
      problem: "The wedding market is fragmented across inspiration, planning, and procurement. Couples feel overwhelmed, planners herd cats, vendors waste time qualifying.",
      objective: "Prove marketplace liquidity fast and lift lead→book conversion in 12 weeks.",
      audience: "Couples planning weddings, wedding planners, and service vendors"
    },

    features: [
      {
        title: "Smart Matching",
        description: "AI-powered vendor recommendations based on style preferences and budget constraints.",
        icon: "🎯"
      },
      {
        title: "Multi-Role Dashboards", 
        description: "Tailored interfaces for couples, planners, and vendors with role-specific workflows.",
        icon: "📊"
      },
      {
        title: "Decision Packages",
        description: "Structured decision flows that compress complex choices into manageable steps.",
        icon: "📦"
      },
      {
        title: "Real-time Collaboration",
        description: "Live updates and comments system for seamless stakeholder communication.",
        icon: "💬"
      }
    ],

    process: [
      { step: "Research", description: "User interviews & market analysis", icon: "🔍" },
      { step: "Wireframes", description: "Information architecture & user flows", icon: "📝" },
      { step: "Prototypes", description: "Interactive mockups & testing", icon: "🎨" },
      { step: "Testing", description: "Usability testing & iteration", icon: "🧪" },
      { step: "Launch", description: "Final design & handoff", icon: "🚀" }
    ],

    outcomes: [
      { metric: "Lead→book conversion", value: "12% → 18%" },
      { metric: "Day-7 active couples", value: "45% → 62%" },
      { metric: "Vendor response time", value: "48h → 18h" }
    ],

    reflection: "The biggest challenge was balancing the needs of three distinct user types without creating interface complexity. We solved this through role-based progressive disclosure and smart defaults. Key learning: when designing for multiple stakeholders, start with the shared workflow and layer on role-specific features.",

    links: {
      live: "https://example.com",
      github: "https://github.com",
      figma: "https://figma.com"
    }
  };

  // SEO setup
  useEffect(() => {
    document.title = `${project.title} - Project Case Study`;
    
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", project.description);
  }, [project.title, project.description]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation - Minimalistic */}
      <div className="absolute top-8 left-8 z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>

      <main className="px-8 py-16 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="mb-32 pt-16">
          <div className="mb-16">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8">
              {project.title}
            </h1>
            <p className="text-2xl text-muted-foreground mb-12">
              {project.subtitle}
            </p>
            
            <div className="grid md:grid-cols-2 gap-16 mb-16">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Role</p>
                  <p className="text-lg">{project.role.title}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Duration</p>
                  <p className="text-lg">{project.role.duration}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Team</p>
                  <p className="text-lg">{project.role.team}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Tools</p>
                  <p className="text-lg">{project.role.tools.join(" • ")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
              <div className="bg-background/90 rounded-full p-8 group-hover:scale-110 transition-transform">
                <Play className="h-12 w-12 text-foreground ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Context Section */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">Context & Challenge</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Problem</h3>
              <p className="text-lg leading-relaxed mb-8">
                {project.context.problem}
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Objective</h3>
              <p className="text-lg leading-relaxed">
                {project.context.objective}
              </p>
            </div>
            <div className="bg-muted/30 rounded-2xl h-80"></div>
          </div>
        </section>

        {/* Role & Impact */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">My Role & Impact</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="bg-muted/30 rounded-2xl h-80"></div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-muted-foreground uppercase tracking-wider">Key Responsibilities</h3>
              <ul className="space-y-3 text-lg mb-12">
                <li>Led end-to-end product design strategy</li>
                <li>Conducted user research and stakeholder interviews</li>
                <li>Designed multi-role dashboard experiences</li>
                <li>Created and maintained design system</li>
                <li>Collaborated closely with engineering team</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-6 text-muted-foreground uppercase tracking-wider">Outcomes</h3>
              <div className="space-y-4">
                {project.outcomes.map((outcome, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/20">
                    <span className="text-lg">{outcome.metric}</span>
                    <span className="text-lg font-mono">{outcome.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">Features & Complexity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.features.map((feature, index) => (
              <div key={index} className="border-l-2 border-border/20 pl-8 py-6">
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">Process & Approach</h2>
          <div className="space-y-12">
            {project.process.map((phase, index) => (
              <div key={index} className="flex items-start gap-8">
                <div className="text-4xl font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{phase.step}</h3>
                  <p className="text-lg text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Walkthrough */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">Video Walkthrough</h2>
          <div className="relative aspect-video bg-muted/50 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-background/5 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-background/90 rounded-full p-12 mb-6 inline-block">
                  <Play className="h-16 w-16 text-foreground ml-2" />
                </div>
                <p className="text-xl text-muted-foreground">Product Demo • 60 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="mb-32">
          <h2 className="text-5xl font-bold mb-16">Reflection & Learnings</h2>
          <div className="max-w-3xl">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.reflection}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-4xl font-bold mb-8">View the Project</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <a 
              href={project.links.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-colors text-lg font-medium"
            >
              <ExternalLink className="h-5 w-5" />
              Live Project
            </a>
            <a 
              href={project.links.figma} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-lg font-medium"
            >
              <Figma className="h-5 w-5" />
              Figma
            </a>
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full hover:bg-muted/50 transition-colors text-lg font-medium"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;