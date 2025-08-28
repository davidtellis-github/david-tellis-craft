import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, ExternalLink, Github, Figma, Clock, Users, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/80 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-border hover:bg-muted text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {project.subtitle}
                </p>
                <p className="text-muted-foreground max-w-2xl">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.outcomes.map((outcome, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {outcome.metric}: {outcome.value}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="border-2 border-dashed border-border/50">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                    Role & Scope
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Role:</strong> {project.role.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Duration:</strong> {project.role.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span><strong>Team:</strong> {project.role.team}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.role.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Video Thumbnail */}
          <div className="mt-12">
            <div className="relative aspect-video bg-muted rounded-2xl border border-border overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="bg-background/90 rounded-full p-6 border border-border shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                Project Walkthrough • 2:30
              </div>
            </div>
          </div>
        </section>

        {/* About the Project */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">About the Project</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Problem</h3>
                <p className="text-sm text-muted-foreground">
                  {project.context.problem}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Objective</h3>
                <p className="text-sm text-muted-foreground">
                  {project.context.objective}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Audience</h3>
                <p className="text-sm text-muted-foreground">
                  {project.context.audience}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* My Role */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">My Role</h2>
          <Card className="bg-accent/50 border-2">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Led end-to-end product design strategy</li>
                    <li>• Conducted user research and stakeholder interviews</li>
                    <li>• Designed multi-role dashboard experiences</li>
                    <li>• Created and maintained design system</li>
                    <li>• Collaborated closely with engineering team</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Impact & Outcomes</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Increased conversion rate by 50%</li>
                    <li>• Reduced vendor response time by 62%</li>
                    <li>• Improved user activation by 38%</li>
                    <li>• Delivered on time within 12-week timeline</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features & Complexity */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Features & Complexity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process & Approach */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Process & Approach</h2>
          <div className="relative">
            {/* Process Timeline */}
            <div className="grid md:grid-cols-5 gap-4">
              {project.process.map((phase, index) => (
                <div key={index} className="relative">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl mb-3">{phase.icon}</div>
                      <h3 className="font-semibold mb-2">{phase.step}</h3>
                      <p className="text-xs text-muted-foreground">
                        {phase.description}
                      </p>
                    </CardContent>
                  </Card>
                  {index < project.process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-border z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Walkthrough */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Video Walkthrough</h2>
          <div className="relative aspect-video bg-muted rounded-2xl border border-border overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <div className="bg-background/90 rounded-full p-8 border border-border shadow-lg mb-4 inline-block">
                  <Play className="h-12 w-12 text-primary ml-1" />
                </div>
                <p className="text-muted-foreground">Product Demo • 60 seconds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reflection & Learnings */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Reflection & Learnings</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                {project.reflection}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Interested in Learning More?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                View the live project, explore the prototype, or dive deeper into the design process.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live Project
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={project.links.figma} target="_blank" rel="noopener noreferrer">
                    <Figma className="h-4 w-4 mr-2" />
                    View in Figma
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;