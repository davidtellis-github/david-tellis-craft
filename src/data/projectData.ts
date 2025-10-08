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

  links: {
    live?: string;
    github?: string;
    figma?: string;
    playstore?: string;
  };
}

export const projectsData: Record<string, ProjectData> = {
  "wedding-verse": {
    id: "wedding-verse",
    title: "Wedding Verse",
    subtitle: "A shared workspace for couples, planners, and vendors",
    description: "Weddings are multi-stakeholder and decision-dense. Couples juggle budgets, vendors, and timelines, often spread across disconnected tools. We built a guided workspace that compresses decisions into packages—improving clarity and velocity under time limits.",
    category: "b2c",
    year: "2024",
    services: "Strategy + Design + Engineering",
    
    role: {
      title: "Lead Product Designer",
      duration: "Q4 2023 – Q2 2024 (≈ 12 weeks for MVP)",
      team: "PM • Eng • Data • Ops",
      tools: ["Figma", "Principle", "Rive", "Supabase"]
    },

    context: {
      problem: "The wedding market is fragmented across inspirations, planning, and procurement. Couples feel overwhelmed, planners have siloed tools, and vendors waste time on quoting.",
      objective: "Prove marketplace liquidity fast and lift lead-to-book conversion in 12 weeks.",
      audience: "Couples planning weddings, wedding planners, and service vendors"
    },

    features: [
      {
        title: "Smart Matching",
        description: "AI-powered vendor recommendations based on style preferences and budget.",
        icon: "🎯"
      },
      {
        title: "Decision Packages",
        description: "Structured decision flows that compress complex vendor choices into manageable steps.",
        icon: "📦"
      },
      {
        title: "Multi-Role Dashboards", 
        description: "Tailored interfaces for couples, planners, and vendors with role-specific workflows.",
        icon: "📊"
      },
      {
        title: "Real-Time Collaboration",
        description: "Live updates and comments system for seamless communication.",
        icon: "💬"
      },
      {
        title: "Wedding Assistant",
        description: "A guided assistant to help with budgets, checklists, vendor curation, and mood boards.",
        icon: "🤖"
      },
      {
        title: "Mood Boards",
        description: "Collect inspirations from vendor galleries or import from Pinterest/Instagram to guide choices.",
        icon: "🎨"
      },
      {
        title: "Mobile App",
        description: "Launched on Play Store in 2025, extending planning and collaboration into on-the-go workflows.",
        icon: "📱"
      }
    ],

    process: [
      { step: "Research", description: "User interviews & market analysis", icon: "🔍" },
      { step: "Wireframes", description: "Information architecture & flows", icon: "📝" },
      { step: "Prototypes", description: "Interactive mockups & testing", icon: "🎨" },
      { step: "Testing", description: "Usability testing & iteration", icon: "🧪" },
      { step: "Launch", description: "MVP release & dev handoff", icon: "🚀" }
    ],

    outcomes: [
      { metric: "Lead→book conversion", value: "12% → 19%" },
      { metric: "Day-7 active couples", value: "45% → 63%" },
      { metric: "Vendor response time", value: "48h → 18h" }
    ],

    reflection: "The biggest challenge was balancing the needs of three distinct user types without creating interface complexity. We solved this through role-based progressive disclosure and smart defaults. Launching the mobile app confirmed the importance of accessibility—many users relied on planning on-the-go, especially couples and vendors.",

    links: {
      live: "https://weddingverse.com",
      github: "https://github.com/weddingverse",
      figma: "https://figma.com/weddingverse",
      playstore: "https://play.google.com/store/apps/details?id=com.ken42.weddingverse&pli=1"
    }
  },

  "futurcraft-ai": {
    id: "futurcraft-ai",
    title: "Futurcraft AI",
    subtitle: "AI-powered creative design platform",
    description: "A comprehensive AI platform that empowers designers and creators with intelligent design assistance, automated workflows, and collaborative features for modern creative teams.",
    category: "ai",
    year: "2025",
    services: "Strategy + Design + Engineering",
    
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
    category: "finops",
    year: "2025",
    services: "Strategy + Design + Engineering",
    
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
    }
  },

  "health-project": {
    id: "health-project",
    title: "HealthCare Platform",
    subtitle: "Patient-centered digital health ecosystem",
    description: "Comprehensive healthcare platform connecting patients, providers, and care coordinators through seamless digital experiences, improving care accessibility and health outcomes.",
    category: "healthcare",
    year: "2024",
    services: "Strategy + Design",
    
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

  "project-alpha": {
    id: "project-alpha",
    title: "Project Alpha",
    subtitle: "Next-generation e-commerce platform",
    description: "Modern e-commerce solution focused on personalized shopping experiences, seamless checkout flows, and data-driven merchant insights to drive conversion and customer loyalty.",
    category: "b2c",
    year: "2024",
    services: "Strategy + Design + Engineering",
    
    role: {
      title: "Product Designer",
      duration: "Q1–Q3 '24 (≈ 16 weeks)",
      team: "PM • Frontend • Backend • Data Analytics",
      tools: ["Figma", "Hotjar", "React", "Node.js", "Stripe"]
    },

    context: {
      problem: "Traditional e-commerce platforms have 68% cart abandonment rates and lack personalization. Merchants struggle with conversion optimization and customer retention.",
      objective: "Build a conversion-focused platform with intelligent personalization and simplified merchant management.",
      audience: "Online shoppers, e-commerce merchants, and marketplace vendors"
    },

    features: [
      {
        title: "Smart Personalization",
        description: "AI-driven product recommendations and personalized shopping experiences.",
        icon: "🎯"
      },
      {
        title: "Frictionless Checkout",
        description: "One-click purchasing with multiple payment options and guest checkout optimization.",
        icon: "💳"
      },
      {
        title: "Merchant Dashboard",
        description: "Comprehensive analytics and inventory management with actionable insights.",
        icon: "📊"
      },
      {
        title: "Social Commerce",
        description: "Integrated social sharing, reviews, and community-driven discovery features.",
        icon: "🌟"
      }
    ],

    process: [
      { step: "Research", description: "E-commerce behavior analysis & merchant interviews", icon: "🔍" },
      { step: "Strategy", description: "Conversion funnel optimization & feature prioritization", icon: "📈" },
      { step: "Design", description: "User experience design & conversion-focused prototypes", icon: "🎨" },
      { step: "Testing", description: "A/B testing & conversion rate optimization", icon: "🧪" },
      { step: "Launch", description: "Progressive rollout & performance monitoring", icon: "🚀" }
    ],

    outcomes: [
      { metric: "Cart abandonment", value: "68% → 42%" },
      { metric: "Conversion rate", value: "2.3% → 4.1%" },
      { metric: "Customer lifetime value", value: "35% increase" }
    ],

    reflection: "E-commerce success depends on micro-interactions and trust signals. Every friction point in the checkout flow directly impacts revenue, so obsessive attention to detail was crucial.",

    links: {
      live: "https://project-alpha.com",
      github: "https://github.com/project-alpha"
    }
  },

  "boston-financial": {
    id: "boston-financial",
    title: "Boston Financial",
    subtitle: "AI-driven compliance management & task workflow optimization",
    description: "UX strategy and design solution for improving compliance management and enabling better task assignment workflows through an AI-driven approach. Focused on reducing manual inefficiencies and automating regulatory compliance processes.",
    category: "webdesigns",
    year: "2024",
    services: "UX Strategy + Design",
    
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
    }
  },

  "ui-exploration-1": {
    id: "ui-exploration-1",
    title: "UI Exploration #1",
    subtitle: "Experimental interface patterns and micro-interactions",
    description: "Exploration of cutting-edge interface patterns, animation techniques, and interaction design concepts for next-generation digital products and user experiences.",
    category: "interactions",
    year: "2024",
    services: "Strategy + Design + Engineering",
    
    role: {
      title: "Interaction Designer",
      duration: "Q3 '24 (≈ 6 weeks)",
      team: "Design Research • Frontend • Motion Designer",
      tools: ["Figma", "Framer", "React", "Three.js", "Lottie"]
    },

    context: {
      problem: "Traditional interface patterns are becoming stale. Users expect more engaging and intuitive interactions, but many experimental approaches sacrifice usability.",
      objective: "Explore innovative interaction patterns that enhance usability while creating memorable user experiences.",
      audience: "Design teams, developers, and forward-thinking product organizations"
    },

    features: [
      {
        title: "Gestural Interfaces",
        description: "Multi-touch gestures and spatial interactions for intuitive navigation.",
        icon: "👋"
      },
      {
        title: "Contextual Animations",
        description: "Physics-based micro-interactions that provide meaningful feedback.",
        icon: "🎭"
      },
      {
        title: "Adaptive Layouts",
        description: "Interfaces that respond to user behavior and environmental context.",
        icon: "🔄"
      },
      {
        title: "Experimental Typography",
        description: "Dynamic text treatments and variable font implementations.",
        icon: "🔤"
      }
    ],

    process: [
      { step: "Inspiration", description: "Design trend research & technology exploration", icon: "💡" },
      { step: "Concepts", description: "Rapid ideation & interaction concept development", icon: "✨" },
      { step: "Prototypes", description: "High-fidelity interactive prototypes", icon: "🛠️" },
      { step: "Testing", description: "User perception studies & usability validation", icon: "🔬" },
      { step: "Documentation", description: "Pattern library & implementation guidelines", icon: "📋" }
    ],

    outcomes: [
      { metric: "User engagement", value: "45% longer sessions" },
      { metric: "Interaction success", value: "92% task completion" },
      { metric: "Designer adoption", value: "15 teams implemented patterns" }
    ],

    reflection: "Innovation in interaction design requires balancing novelty with usability. The most successful patterns were those that felt natural and enhanced existing mental models rather than replacing them.",

    links: {
      live: "https://ui-exploration.demo",
      github: "https://github.com/ui-exploration-1",
      figma: "https://figma.com/ui-exploration-1"
    }
  },

  "ui-exploration-2": {
    id: "ui-exploration-2",
    title: "UI Exploration #2",
    subtitle: "Advanced data visualization and dashboard interfaces",
    description: "Deep exploration of complex data visualization techniques, dashboard composition patterns, and interactive analytics interfaces for enterprise and consumer applications.",
    category: "interactions",
    year: "2024",
    services: "Strategy + Design + Engineering",
    
    role: {
      title: "Data Visualization Designer",
      duration: "Q4 '24 (≈ 8 weeks)",
      team: "Data Science • Frontend • UX Research",
      tools: ["Figma", "D3.js", "Observable", "React", "WebGL"]
    },

    context: {
      problem: "Complex data is often presented in overwhelming dashboards that obscure insights. Users struggle to find actionable information in dense visualizations.",
      objective: "Design intuitive data exploration interfaces that reveal insights through progressive disclosure and intelligent defaults.",
      audience: "Data analysts, business stakeholders, and decision makers"
    },

    features: [
      {
        title: "Intelligent Hierarchy",
        description: "Adaptive information architecture that prioritizes relevant data based on user context.",
        icon: "🧠"
      },
      {
        title: "Interactive Narratives",
        description: "Guided data exploration with storytelling elements and contextual insights.",
        icon: "📊"
      },
      {
        title: "Real-time Collaboration",
        description: "Shared analytics workspace with annotation and discussion features.",
        icon: "🤝"
      },
      {
        title: "Responsive Visualizations",
        description: "Charts and graphs that adapt seamlessly across devices and screen sizes.",
        icon: "📱"
      }
    ],

    process: [
      { step: "Analysis", description: "Data complexity assessment & user workflow mapping", icon: "🔍" },
      { step: "Patterns", description: "Visualization pattern library & interaction taxonomy", icon: "📐" },
      { step: "Prototypes", description: "Interactive dashboard prototypes & user testing", icon: "🖥️" },
      { step: "Refinement", description: "Performance optimization & accessibility improvements", icon: "⚡" },
      { step: "Framework", description: "Reusable component system & implementation guide", icon: "🏗️" }
    ],

    outcomes: [
      { metric: "Data comprehension", value: "65% faster insights" },
      { metric: "User confidence", value: "87% feel more informed" },
      { metric: "Dashboard adoption", value: "3x daily active users" }
    ],

    reflection: "Effective data visualization is about reducing cognitive load while maintaining analytical depth. The breakthrough was creating layered interfaces that serve both casual viewers and power users.",

    links: {
      live: "https://data-viz-demo.com",
      github: "https://github.com/ui-exploration-2",
      figma: "https://figma.com/ui-exploration-2"
    }
  },

  "project-beta": {
    id: "project-beta",
    title: "Project Beta",
    subtitle: "Enterprise workflow automation platform",
    description: "Comprehensive B2B platform that streamlines complex business processes through intelligent automation, collaborative workflows, and enterprise-grade security and compliance features.",
    category: "b2b",
    year: "2023",
    services: "Strategy + Design + Engineering",
    
    role: {
      title: "Senior Product Designer",
      duration: "Q2–Q4 '23 (≈ 18 weeks)",
      team: "PM • Enterprise Architect • Full-stack • DevOps",
      tools: ["Figma", "Miro", "React", "Node.js", "PostgreSQL"]
    },

    context: {
      problem: "Enterprise teams waste 40% of their time on manual processes and context switching between tools. Existing workflow solutions are too rigid or too complex.",
      objective: "Create a flexible automation platform that reduces manual work while maintaining process control and compliance requirements.",
      audience: "Operations managers, process analysts, and enterprise IT teams"
    },

    features: [
      {
        title: "Visual Workflow Builder",
        description: "Drag-and-drop interface for creating complex automation workflows without coding.",
        icon: "🔧"
      },
      {
        title: "Smart Integrations",
        description: "Pre-built connectors and intelligent data mapping for popular enterprise tools.",
        icon: "🔗"
      },
      {
        title: "Compliance Dashboard",
        description: "Audit trails, approval workflows, and regulatory compliance monitoring.",
        icon: "📋"
      },
      {
        title: "Performance Analytics",
        description: "Process optimization insights with bottleneck identification and efficiency metrics.",
        icon: "📈"
      }
    ],

    process: [
      { step: "Enterprise Research", description: "Workflow analysis & stakeholder requirement gathering", icon: "🏢" },
      { step: "Architecture", description: "System design & integration planning", icon: "🏗️" },
      { step: "MVP Design", description: "Core workflow builder & essential integrations", icon: "🎯" },
      { step: "Beta Testing", description: "Enterprise pilot programs & feedback integration", icon: "🧪" },
      { step: "Scale", description: "Production deployment & customer success monitoring", icon: "📊" }
    ],

    outcomes: [
      { metric: "Process efficiency", value: "40% time reduction" },
      { metric: "Error reduction", value: "78% fewer manual errors" },
      { metric: "Enterprise adoption", value: "12 major clients onboarded" }
    ],

    reflection: "B2B platforms must balance flexibility with simplicity. The key insight was providing powerful customization options while maintaining guided workflows for common use cases.",

    links: {
      live: "https://project-beta.enterprise",
      github: "https://github.com/project-beta"
    }
  }
};