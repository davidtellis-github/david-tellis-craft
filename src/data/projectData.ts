export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  services: string;
  
  role: {
    title: string;
    duration: string;
    team: string;
    tools: string[];
  };

  context: {
    problem: string;
    objective: string;
    audience: string;
  };

  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  process: Array<{
    step: string;
    description: string;
    icon: string;
  }>;

  outcomes: Array<{
    metric: string;
    value: string;
  }>;

  reflection: string;

  designSystem?: {
    goals: string[];
    coreElements: Array<{
      title: string;
      description: string;
    }>;
    note?: string;
    images: string[];
  };

  iterations?: {
    intro: string;
    decisions: Array<{
      challenge: string;
      iteration: string;
      finalDecision: string;
    }>;
    note?: string;
    images: string[];
  };

  links: {
    live?: string;
    github?: string;
    figma?: string;
    playstore?: string;
  };

  videoUrl?: string;

  mockupImages?: string[];
  
  images?: string[];
}

export const projectsData: Record<string, ProjectData> = {
  "wedding-verse": {
    id: "wedding-verse",
    title: "Wedding Verse",
    subtitle: "Led complete product design for a dual-sided marketplace connecting couples with wedding vendors through AI-powered discovery.",
    description: "Owned end-to-end design strategy, UX research, interface design, and AI conversation flows. Built a comprehensive 120-component design system, designed AI voice onboarding, and delivered a scalable MVP in 5 months—achieving 63% faster vendor discovery, 42% higher response rates, and 28% Week 1 retention lift.",
    category: "product",
    year: "2024",
    services: "Product Design and Strategy",
    
    mockupImages: ['weddingverse-featured.png', 'wedding-verse-context.jpg', 'wedding-verse-role.jpg'],
    
    role: {
      title: "Lead Product Designer",
      duration: "8-month engagement",
      team: "CEO • Engineering Team • Ops",
      tools: ["Figma", "Design Systems", "User Research", "AI Scripting"]
    },

    context: {
      problem: "Couples search across 10+ fragmented platforms with overwhelming choice and no clarity. Vendors receive low-quality leads and ghost inquiries. Wedding planning feels like administrative work rather than an exciting milestone, with no platform providing confidence in vendor reliability or fit.",
      objective: "Create a guided discovery platform that reduces cognitive load for couples while helping vendors showcase quality and respond faster. Transform chaotic vendor search into a calm, personalized experience that respects emotional decision-making patterns.",
      audience: "Couples planning weddings and wedding service vendors (photographers, decorators, caterers, venues)"
    },

    features: [
      {
        title: "For Couples: Contextual Vendor Recommendations",
        description: "Smart recommendations based on progressive profiling. Simplified decision-making with visual shortlists and comparison tools.",
        icon: "💑"
      },
      {
        title: "For Couples: Conversational Onboarding",
        description: "No overwhelming forms. Conversational onboarding that feels natural and easy.",
        icon: "💬"
      },
      {
        title: "For Vendors: Streamlined Profile Builder",
        description: "Easy profile creation with structured lead management and real-time lead inbox with priority scoring.",
        icon: "👔"
      },
      {
        title: "For Vendors: AI-Powered Onboarding",
        description: "Converted 3-hour setup into 15-minute conversation using AI voice agent.",
        icon: "🤖"
      },
      {
        title: "Platform: Scalable Design System",
        description: "120+ components, 8 pattern libraries enabling rapid iteration and consistent experiences.",
        icon: "🎨"
      },
      {
        title: "Platform: Responsive Experience",
        description: "Seamless web and mobile experiences with extensible architecture for AI recommendations.",
        icon: "📱"
      }
    ],

    process: [
      { 
        step: "Research", 
        description: "Conducted user interviews to map emotional triggers, pain points, and decision patterns across both personas (couples and vendors).", 
        icon: "🔍" 
      },
      { 
        step: "Definition", 
        description: "Created journey maps, service blueprints, and interaction models balancing dual-user needs.", 
        icon: "📐" 
      },
      { 
        step: "Iteration", 
        description: "Designed 40+ flow variations, tested with 15 couples and 12 vendors to validate usability.", 
        icon: "🔄" 
      },
      { 
        step: "System Design", 
        description: "Built component library and documentation to accelerate engineering handoff.", 
        icon: "🎨" 
      },
      { 
        step: "AI Design", 
        description: "Scripted conversational flows with fallback logic and guardrails for 85% onboarding accuracy.", 
        icon: "🤖" 
      },
      { 
        step: "Launch Support", 
        description: "Partnered with engineering through QA, refinement, and post-launch optimization.", 
        icon: "🚀" 
      }
    ],

    outcomes: [
      { metric: "faster vendor discovery", value: "63%" },
      { metric: "higher vendor response rate", value: "42%" },
      { metric: "better Week 1 retention", value: "28%" }
    ],

    reflection: "Wedding planning requires UX that acknowledges anxiety, not just efficiency. Saying 'no' to 20 features enabled shipping 5 features that actually mattered. Both user groups succeeded when platform logic felt consistent. Conversational interfaces require both personality and strict boundary conditions. Design systems aren't documentation—they're strategic accelerators that enabled 3x faster Phase 2 development.",

    designSystem: {
      goals: [
        "Create a unified language that works across Couple, Planner, and Vendor roles",
        "Ensure scalable color theming and component reuse",
        "Reduce design debt and developer handoff friction"
      ],
      coreElements: [
        {
          title: "Typography",
          description: "Hierarchical type scale with distinct weights for information density"
        },
        {
          title: "Color Tokens",
          description: "Dynamic theme logic for light/dark modes and role-based color accents"
        },
        {
          title: "Components",
          description: "100+ reusable components with interactive states and auto-layout logic"
        },
        {
          title: "Patterns",
          description: "Dashboard templates, onboarding flows, and vendor card systems"
        },
        {
          title: "Icons & Microinteractions",
          description: "Lightweight icon set + consistent motion system for states and feedback"
        }
      ],
      note: "This system became the foundation for all current and upcoming features — powering dashboards, Neyara AI, and future mobile expansion.",
      images: [
        "wedding-verse-design-system-1.png",
        "wedding-verse-design-system-2.png",
        "wedding-verse-design-system-3.png"
      ]
    },

    videoUrl: "https://player.vimeo.com/video/1134826452?badge=0&autopause=0&autoplay=1&muted=1&loop=1&controls=0&title=0&byline=0&portrait=0",

    iterations: {
      intro: "The Wedding Verse interface went through multiple cycles of exploration — over 2,000 Figma frames across 12 user journeys. Each iteration was data-driven, tested, and refined for clarity and emotional resonance.",
      decisions: [
        {
          challenge: "Role Switching Confusion",
          iteration: "Tested multiple navigation patterns (toggle, segmented control, breadcrumb)",
          finalDecision: "Adopted hybrid top bar with quick switch + contextual breadcrumbs"
        },
        {
          challenge: "Overloaded Vendor Cards",
          iteration: "Explored compact, expandable, and layered versions",
          finalDecision: "Finalized progressive disclosure layout to balance depth and clarity"
        },
        {
          challenge: "Onboarding Fatigue",
          iteration: "Compared form-based vs conversational flow",
          finalDecision: "Implemented chat-style onboarding powered by Neyara prompts"
        },
        {
          challenge: "Moodboard Collaboration",
          iteration: "Tested gallery grid vs drag-and-drop canvas",
          finalDecision: "Opted for freeform grid to mirror creative workflow of planners"
        },
        {
          challenge: "Mobile Responsiveness",
          iteration: "Iterated grid logic across 4 breakpoints",
          finalDecision: "Used adaptive components with fluid column resizing"
        }
      ],
      note: "Every iteration was a step toward simplicity — making a complex, multi-role system feel effortless and personal.",
      images: [
        "wedding-verse-iterations-1.png",
        "wedding-verse-iterations-2.png",
        "wedding-verse-iterations-3.png",
        "wedding-verse-iterations-4.png",
        "wedding-verse-iterations-5.png"
      ]
    },

    links: {
      live: "https://weddingverse.com",
      github: "https://github.com/weddingverse",
      figma: "https://figma.com/weddingverse",
      playstore: "https://play.google.com/store/apps/details?id=com.ken42.weddingverse&pli=1"
    }
  },

  "ideabaaz": {
    id: "ideabaaz",
    title: "Ideabaaz",
    subtitle: "A startup ecosystem born from a live TV show that connects founders, investors, mentors, and corporates.",
    description: "Ideabaaz started as a national TV show on Zee TV to spotlight new startups. I helped build a digital platform to turn that visibility into real connections where startups, investors, trainers, and corporates can discover, connect, and grow together.",
    category: "concepts",
    year: "Q1 2024 (Ongoing)",
    services: "Product Design and Strategy",
    
    mockupImages: ['ideabaaz-featured.png', 'ideabaaz-laptop-mockup.png'],
    
    role: {
      title: "Lead Product Designer and Early Project Manager",
      duration: "Q1 2024 – Ongoing (Platform in development)",
      team: "Cross-functional team including producers, developers, and marketing",
      tools: ["Figma", "FigJam"]
    },

    context: {
      problem: "India's startup ecosystem is crowded but disconnected. Founders struggle to reach the right investors and mentors. Ideabaaz started as a national TV show on Zee TV to spotlight new startups but needed a digital platform to turn that visibility into real connections.",
      objective: "Build a unified digital ecosystem where startups, investors, trainers, corporates, and franchise seekers can discover, connect, and grow together.",
      audience: "Founders, investors, mentors, corporates, and franchise seekers in India's startup ecosystem"
    },

    features: [
      {
        title: "Live Show Integration",
        description: "Highlights startups and investors featured on the Zee TV show with real-time engagement.",
        icon: "📺"
      },
      {
        title: "Founder Profiles",
        description: "Interactive public startup profiles with investor connection options.",
        icon: "🚀"
      },
      {
        title: "Investor Discovery",
        description: "Smart filters and recommendations for matching startups with relevant investors.",
        icon: "💼"
      },
      {
        title: "Training and Mentorship Hub",
        description: "Curated mentor programs and learning tracks for early-stage founders.",
        icon: "🎓"
      },
      {
        title: "Corporate and Franchise Network",
        description: "Enables collaborations between corporates and startups, and supports franchise seekers.",
        icon: "🤝"
      }
    ],

    process: [
      { 
        step: "Research", 
        description: "Interviewed founders and investors to map ecosystem needs.", 
        icon: "🔍" 
      },
      { 
        step: "Ideation and Wireframes", 
        description: "Created user flows and low-fidelity wireframes in FigJam.", 
        icon: "📐" 
      },
      { 
        step: "Visual Design", 
        description: "Developed a scalable UI system in Figma aligned with the Ideabaaz brand.", 
        icon: "🎨" 
      },
      { 
        step: "Collaboration", 
        description: "Worked with the show's creative team, stakeholders, and developers to maintain consistency.", 
        icon: "🤝" 
      },
      { 
        step: "Project Management", 
        description: "Coordinated deliverables, timelines, and communication across marketing and product teams.", 
        icon: "📋" 
      }
    ],

    outcomes: [
      { metric: "Design direction", value: "Established clear platform vision" },
      { metric: "Product validation", value: "Concept validated with stakeholders" },
      { metric: "Foundation built", value: "Ready for 2025 digital rollout" }
    ],

    reflection: "Building Ideabaaz taught me how to bridge media and product ecosystems. Managing design, marketing, and stakeholder collaboration early shaped a clear product direction and a strong foundation for scaling the platform beyond television.",

    links: {
      figma: "https://figma.com/ideabaaz"
    }
  },

  "futurcraft-ai": {
    id: "futurcraft-ai",
    title: "Futurcraft AI",
    subtitle: "AI-powered creative design platform",
    description: "A comprehensive AI platform that empowers designers and creators with intelligent design assistance, automated workflows, and collaborative features for modern creative teams.",
    category: "product",
    year: "2025",
    services: "Design and UX",
    
    mockupImages: ['futurcraft-featured.png'],
    
    role: {
      title: "Senior Product Designer",
      duration: "Q4 '24 – Q2 '25 (≈ 16 weeks)",
      team: "PM • AI Eng • Frontend • Backend",
      tools: ["Figma", "Framer", "React", "Python", "TensorFlow"]
    },

    context: {
      problem: "Creative professionals spend 60% of their time on repetitive tasks rather than creative ideation. Current AI tools lack design context and collaborative features.",
      objective: "Build an AI platform that enhances creativity while maintaining design quality and team collaboration.",
      audience: "Design teams, creative agencies, and individual designers"
    },

    features: [
      {
        title: "AI Design Assistant",
        description: "Context-aware AI that understands design principles and brand guidelines.",
        icon: "🤖"
      },
      {
        title: "Collaborative Workspace",
        description: "Real-time collaboration with AI suggestions and human feedback integration.",
        icon: "👥"
      },
      {
        title: "Smart Automation",
        description: "Automated design systems, asset generation, and workflow optimization.",
        icon: "⚡"
      },
      {
        title: "Brand Intelligence",
        description: "AI that learns and applies brand guidelines consistently across projects.",
        icon: "🎨"
      }
    ],

    process: [
      { step: "Discovery", description: "AI capabilities research & user needs analysis", icon: "🔍" },
      { step: "Prototyping", description: "AI interaction patterns & interface design", icon: "🛠️" },
      { step: "Testing", description: "AI model training & user experience validation", icon: "🧪" },
      { step: "Integration", description: "Platform development & API integration", icon: "🔗" },
      { step: "Launch", description: "Beta release & performance optimization", icon: "🚀" }
    ],

    outcomes: [
      { metric: "Design task completion", value: "40% faster" },
      { metric: "Creative iteration cycles", value: "3x increase" },
      { metric: "User adoption rate", value: "85% monthly active" }
    ],

    reflection: "The key challenge was making AI feel like a creative partner rather than a replacement. We focused on augmentation over automation, ensuring designers maintain creative control.",

    links: {
      live: "https://futurcraft.ai",
      github: "https://github.com/futurcraft-ai",
      figma: "https://figma.com/futurcraft"
    }
  },

  "turbocloud": {
    id: "turbocloud",
    title: "Turbocloud",
    subtitle: "FinOps platform for cloud cost optimization",
    description: "Enterprise FinOps solution that provides real-time cloud cost visibility, automated optimization recommendations, and collaborative budget management for engineering and finance teams.",
    category: "product",
    year: "2025",
    services: "Dashboard, UX",
    
    role: {
      title: "Lead UX Designer",
      duration: "Q1 '25 – ongoing (≈ 20 weeks)",
      team: "PM • DevOps • Backend • Data Science",
      tools: ["Figma", "D3.js", "React", "AWS", "Kubernetes"]
    },

    context: {
      problem: "Companies waste 30% of cloud spend due to lack of visibility and coordination between engineering and finance teams. Current tools are too technical or too high-level.",
      objective: "Create a unified platform that bridges the gap between technical cloud metrics and business financial goals.",
      audience: "Engineering teams, finance departments, and DevOps professionals"
    },

    features: [
      {
        title: "Cost Intelligence",
        description: "Real-time cost tracking with predictive analytics and anomaly detection.",
        icon: "📊"
      },
      {
        title: "Optimization Engine",
        description: "Automated recommendations for right-sizing, scheduling, and resource allocation.",
        icon: "⚙️"
      },
      {
        title: "Collaborative Budgeting",
        description: "Cross-team budget planning with approval workflows and spending alerts.",
        icon: "💼"
      },
      {
        title: "Executive Dashboards",
        description: "Business-focused reporting with cost attribution and ROI metrics.",
        icon: "📈"
      }
    ],

    process: [
      { step: "Research", description: "FinOps methodology study & stakeholder interviews", icon: "🔍" },
      { step: "Architecture", description: "Information architecture & data visualization design", icon: "🏗️" },
      { step: "Prototyping", description: "Interactive dashboards & workflow prototypes", icon: "📱" },
      { step: "Validation", description: "Enterprise user testing & feedback integration", icon: "✅" },
      { step: "Scale", description: "Multi-cloud deployment & feature expansion", icon: "🌐" }
    ],

    outcomes: [
      { metric: "Cloud cost reduction", value: "25% average" },
      { metric: "Budget accuracy", value: "92% within 5%" },
      { metric: "Team collaboration", value: "60% faster decisions" }
    ],

    reflection: "Designing for both technical and business users required creating multiple interface layers while maintaining data consistency. The key was progressive disclosure based on user roles.",

    links: {
      live: "https://turbocloud.io",
      github: "https://github.com/turbocloud",
      figma: "https://figma.com/turbocloud"
    },

    mockupImages: [
      'turbocloud-featured.png',
      'turbocloud-provider-selection.jpg',
      'turbocloud-dashboard-1.jpg'
    ],
    
    images: [
      'turbocloud-signup.jpg'
    ]
  },

  "health-project": {
    id: "health-project",
    title: "Medpass",
    subtitle: "Patient-centered digital health ecosystem",
    description: "Comprehensive healthcare platform connecting patients, providers, and care coordinators through seamless digital experiences, improving care accessibility and health outcomes.",
    category: "product",
    year: "2024",
    services: "Design, UX",
    
    mockupImages: [],
    
    role: {
      title: "Senior UX Designer",
      duration: "Q2–Q4 '24 (≈ 14 weeks)",
      team: "PM • Healthcare SME • Frontend • Compliance",
      tools: ["Figma", "Miro", "React", "FHIR APIs"]
    },

    context: {
      problem: "Fragmented healthcare systems create poor patient experiences and inefficient care coordination. 73% of patients struggle with digital health tools.",
      objective: "Design an integrated platform that simplifies healthcare interactions while meeting strict compliance requirements.",
      audience: "Patients, healthcare providers, and care coordinators"
    },

    features: [
      {
        title: "Unified Patient Portal",
        description: "Centralized access to medical records, appointments, and care team communication.",
        icon: "🏥"
      },
      {
        title: "Care Coordination Hub",
        description: "Provider collaboration tools with patient progress tracking and care plan management.",
        icon: "🤝"
      },
      {
        title: "Health Monitoring",
        description: "Patient-reported outcomes integration with clinical decision support.",
        icon: "📱"
      },
      {
        title: "Accessible Design",
        description: "WCAG 2.1 AA compliant interface supporting diverse patient populations.",
        icon: "♿"
      }
    ],

    process: [
      { step: "Empathy", description: "Patient journey mapping & provider workflow analysis", icon: "❤️" },
      { step: "Compliance", description: "HIPAA requirements & accessibility standards integration", icon: "🔒" },
      { step: "Design", description: "User interface design & interaction patterns", icon: "🎨" },
      { step: "Validation", description: "Clinical workflow testing & patient usability studies", icon: "🏥" },
      { step: "Implementation", description: "Design system & developer handoff", icon: "🚀" }
    ],

    outcomes: [
      { metric: "Patient satisfaction", value: "4.2/5 → 4.7/5" },
      { metric: "Care plan adherence", value: "68% → 84%" },
      { metric: "Provider efficiency", value: "30% time savings" }
    ],

    reflection: "Healthcare design requires balancing user experience with regulatory compliance. The most impactful decision was prioritizing accessibility from day one, which improved usability for all users.",

    links: {
      figma: "https://figma.com/healthcare-platform"
    }
  },

  "boston-financial": {
    id: "boston-financial",
    title: "Boston Financial",
    subtitle: "AI-driven compliance management & task workflow optimization",
    description: "UX strategy and design solution for improving compliance management and enabling better task assignment workflows through an AI-driven approach. Focused on reducing manual inefficiencies and automating regulatory compliance processes.",
    category: "concepts",
    year: "2024",
    services: "Workflow UX, Design",
    
    mockupImages: ['boston-financial-1.png', 'boston-financial-2.png'],
    
    role: {
      title: "UX Strategist & Designer",
      duration: "Q2–Q3 '24 (≈ 12 weeks)",
      team: "Product Manager • Stakeholders • Compliance Officers",
      tools: ["Figma", "Miro", "Adobe XD", "Principle"]
    },

    context: {
      problem: "Manual compliance management workflows created bottlenecks and complexity. Compliance officers, auditors, and managers faced delays in task allocation and high risk of human error in regulatory checks.",
      objective: "Design an AI-driven system to predict risk areas, automate task assignments, and improve compliance accuracy while reducing manual inefficiencies.",
      audience: "Compliance officers, auditors, managers, and financial professionals"
    },

    features: [
      {
        title: "AI Risk Prediction",
        description: "Machine learning model to predict compliance breach risk areas and automate regulatory checks.",
        icon: "🤖"
      },
      {
        title: "Automated Task Suggestions",
        description: "AI-driven recommendations for task assignments based on workload, priority, and dependencies.",
        icon: "🎯"
      },
      {
        title: "Multiple Task Assignment",
        description: "Batch assignment capabilities with priority tagging and dependency mapping for large-scale workflows.",
        icon: "📋"
      },
      {
        title: "Compliance Dashboard",
        description: "Centralized view of compliance status, risk alerts, and team workload with real-time updates.",
        icon: "📊"
      },
      {
        title: "AI Recommendations Panel",
        description: "Intelligent panel suggesting optimal task allocation and flagging potential compliance gaps.",
        icon: "💡"
      }
    ],

    process: [
      { step: "UX Research", description: "Analyzed workflows, identified bottlenecks, studied user personas", icon: "🔍" },
      { step: "Problem Mapping", description: "Mapped pain points in manual processes and delayed task allocation", icon: "🗺️" },
      { step: "AI Strategy", description: "Proposed AI model for risk prediction and automated suggestions", icon: "🤖" },
      { step: "Wireframes", description: "Created low-fidelity wireframes for dashboard, task screens, and AI panel", icon: "📐" },
      { step: "Presentation", description: "Delivered UX strategy presentation with mockups and business impact analysis", icon: "🎤" }
    ],

    outcomes: [
      { metric: "Time saved", value: "40% reduction in manual tasks" },
      { metric: "Compliance accuracy", value: "95% improvement" },
      { metric: "Task allocation speed", value: "3x faster" }
    ],

    reflection: "Working closely with compliance stakeholders revealed the importance of aligning design with regulatory terminology and nuances. The AI-driven approach not only reduced errors but also empowered managers to make data-backed decisions, transforming a reactive process into a proactive one.",

    links: {
      figma: "https://figma.com/boston-financial-compliance"
    },

    videoUrl: "https://player.vimeo.com/video/1134844637?autoplay=1&muted=1&loop=1"
  },
};