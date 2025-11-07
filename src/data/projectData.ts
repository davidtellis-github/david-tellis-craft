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

  mockupImages?: string[];
}

export const projectsData: Record<string, ProjectData> = {
  "wedding-verse": {
    id: "wedding-verse",
    title: "Wedding Verse",
    subtitle: "A shared workspace for couples, planners, and vendors",
    description: "Wedding Verse is a unified digital workspace where couples, planners, and vendors collaborate seamlessly to plan weddings — visually, transparently, and stress-free. It blends design clarity with automation and human connection, reimagining the fragmented wedding ecosystem into one cohesive experience.",
    category: "product",
    year: "2023",
    services: "Product Design • UX/UI Design • System Design",
    
    mockupImages: ['weddingverse-featured.png'],
    
    role: {
      title: "Product Designer (Lead)",
      duration: "Nov 2023 – Present",
      team: "Developers • CEO • Experience Head • Marketing",
      tools: ["Figma", "Design System Tokens", "User Testing", "IA Design"]
    },

    context: {
      problem: "Wedding planning is a fragmented mess — couples juggle spreadsheets, WhatsApp groups, and endless vendor calls. Vendors lose leads. Planners deal with chaos. Everyone's working hard, but no one's aligned. 70% of couples use multiple apps to manage one wedding. Vendors face 40% lead mismatch due to poor filtering. Planners prefer visual boards but are forced into text-heavy tools.",
      objective: "Build one shared platform where couples, planners, and vendors collaborate effortlessly, while keeping the emotion and excitement alive. Couples value personalization over automation — 'make it ours, not perfect.'",
      audience: "Couples planning weddings, professional wedding planners, and wedding service vendors (photographers, decorators, caterers, etc.)"
    },

    features: [
      {
        title: "Smart Matching (AI-powered)",
        description: "Natural-language search matches couples to vendors based on style, budget, and vibe. 'Find a floral designer under ₹50K in Jaipur' works instantly.",
        icon: "🎯"
      },
      {
        title: "Multi-Role Dashboards",
        description: "Role-specific workspaces for couples, planners, and vendors — each with tailored tools, analytics, and chat systems.",
        icon: "📊"
      },
      {
        title: "Collaborative Moodboards",
        description: "Shared visual boards where couples and planners can drop ideas, references, and vendor samples in real time. (Coming Soon)",
        icon: "🎨"
      },
      {
        title: "Neyara – Wedding AI Assistant",
        description: "Conversational interface that navigates users through planning tasks — 'Add a checklist for catering' or 'Show me shortlisted decorators.' (Coming Soon)",
        icon: "🤖"
      },
      {
        title: "Shortlisting & Decision Packages",
        description: "Compare shortlisted vendors and create decision packs to share with families or co-planners.",
        icon: "📦"
      },
      {
        title: "Checklist & Task Management",
        description: "AI-generated checklists personalized by budget, event scale, and timeline. (Coming Soon)",
        icon: "✅"
      },
      {
        title: "Mobile App",
        description: "Full planning suite in your pocket — syncs with desktop dashboards.",
        icon: "📱"
      }
    ],

    process: [
      { 
        step: "Research", 
        description: "Interviewed 10+ couples, planners, and vendors to identify friction points. Mapped recurring themes: 'miscommunication,' 'decision overload,' and 'fragmented tools.'", 
        icon: "🔍" 
      },
      { 
        step: "Wireframes", 
        description: "Sketched flows for multi-role interactions — where one decision updates three dashboards. Early versions tested role-switching and permission logic.", 
        icon: "📝" 
      },
      { 
        step: "Prototypes", 
        description: "Developed high-fidelity Figma prototypes with layered states and transitions. Ran validation sessions with planners; simplified navigation and vendor cards.", 
        icon: "🎨" 
      },
      { 
        step: "Testing", 
        description: "A/B tested onboarding and vendor search. Replaced long forms with conversational prompts through Neyara.", 
        icon: "🧪" 
      },
      { 
        step: "Launch", 
        description: "Rolled out with 3 role-based dashboards. Upcoming update brings Neyara AI and collaborative moodboards.", 
        icon: "🚀" 
      }
    ],

    outcomes: [
      { metric: "Vendor discovery time", value: "~25 min → 7 min" },
      { metric: "Vendor response rate", value: "35% → 62%" },
      { metric: "Retention post-onboarding", value: "↑ 38%" }
    ],

    reflection: "Designing Wedding Verse taught me how to build empathy across contrasting users — the emotional couple, the structured planner, and the busy vendor. The key was balancing emotional storytelling with design precision. Key learnings: Systems thinking is crucial when multiple roles share one workspace. AI can amplify creativity — if designed to feel human. Luxury aesthetics don't need to sacrifice accessibility. Next steps: Refining multi-user collaboration (couple + planner), expanding Neyara's conversational scope, and integrating visionboard-based recommendations.",

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
        "wedding-verse-design-system-3.png",
        "wedding-verse-design-system-4.png",
        "wedding-verse-design-system-5.png"
      ]
    },

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

  "futurcraft-ai": {
    id: "futurcraft-ai",
    title: "Futurcraft AI",
    subtitle: "AI-powered creative design platform",
    description: "A comprehensive AI platform that empowers designers and creators with intelligent design assistance, automated workflows, and collaborative features for modern creative teams.",
    category: "product",
    year: "2025",
    services: "Strategy + Design + Engineering",
    
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
    },

    mockupImages: ['turbocloud-featured.png']
  },

  "health-project": {
    id: "health-project",
    title: "Medpass",
    subtitle: "Patient-centered digital health ecosystem",
    description: "Comprehensive healthcare platform connecting patients, providers, and care coordinators through seamless digital experiences, improving care accessibility and health outcomes.",
    category: "product",
    year: "2024",
    services: "Strategy + Design",
    
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
    services: "UX Strategy + Design",
    
    mockupImages: [],
    
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

  "ideabaaz": {
    id: "ideabaaz",
    title: "Ideabaaz",
    subtitle: "Get visible. Get funded. Get growing.",
    description: "A web portal built for startups and their ecosystem — a digital space that connects founders, investors, mentors, and solution providers to help ideas grow and scale. The platform acts as a launchpad for India's new-generation entrepreneurs, combining funding access, mentorship, and business solutions in one place.",
    category: "concepts",
    year: "2025",
    services: "Strategy + Design + Stakeholder Management",
    
    mockupImages: ['ideabaaz-featured.png'],
    
    role: {
      title: "Product Designer & Project Lead",
      duration: "2025",
      team: "Presented by Zee • Curated by Turbostart",
      tools: ["Figma"]
    },

    context: {
      problem: "India's startup ecosystem is buzzing — but fragmented. Early-stage founders struggle to find visibility, guidance, and funding opportunities. On the other side, investors and mentors lack a centralized, reliable space to discover and support new ventures.",
      objective: "Design a landing experience that introduces the ecosystem and inspires action, while building trust and credibility through visual tone, partner branding, and content flow.",
      audience: "Founders, investors, mentors, and solution providers in India's startup ecosystem"
    },

    features: [
      {
        title: "For Founders",
        description: "Get visible to investors, access funding opportunities, and showcase your startup to the right audience.",
        icon: "🚀"
      },
      {
        title: "For Investors",
        description: "Discover vetted startups, connect with high-potential founders, and expand your investment portfolio.",
        icon: "💼"
      },
      {
        title: "For Mentors",
        description: "Guide the next generation of entrepreneurs, share your expertise, and contribute to the ecosystem.",
        icon: "🎓"
      },
      {
        title: "For Solution Providers",
        description: "Connect with startups in need of your services, from legal to marketing to technology solutions.",
        icon: "🔧"
      }
    ],

    process: [
      { 
        step: "Hero Section", 
        description: "Bold messaging with 'Get visible. Get funded. Get growing.' and startup registration CTA to build anticipation.", 
        icon: "🎯" 
      },
      { 
        step: "Partner Logos", 
        description: "Built social proof instantly with known brands like House of Cheer, Wizcraft, Zee, Dangal, and YourStory.", 
        icon: "🤝" 
      },
      { 
        step: "Ecosystem Breakdown", 
        description: "Introduced 4 key groups with light, friendly tone and quick CTAs for each user type.", 
        icon: "🧩" 
      },
      { 
        step: "Get Started Section", 
        description: "Motivational messaging encouraging each user type to begin their journey on Ideabaaz.", 
        icon: "✨" 
      },
      { 
        step: "FAQs & Footer", 
        description: "Added transparency, trust signals, and clear ownership credits.", 
        icon: "📋" 
      }
    ],

    outcomes: [
      { metric: "Brand foundation", value: "Established solid identity" },
      { metric: "Landing page design", value: "High-conversion ready" },
      { metric: "Content structure", value: "Adaptable for future features" },
      { metric: "Brand positioning", value: "Credible accelerator backed by Zee" }
    ],

    reflection: "Ideabaaz was about creating more than just a platform — it was about building a web portal where ideas, mentorship, funding, and solutions meet seamlessly. Simplifying complex ecosystems into digestible, inspiring storytelling improves engagement. Strong brand voice alignment early on helps in setting the tone for future UX. Even pre-launch pages can act as powerful brand assets when designed with intention. Every idea deserves the right stage.",

    links: {
      figma: "https://figma.com/ideabaaz"
    }
  },

  "fitness-app": {
    id: "fitness-app",
    title: "Fitness App",
    subtitle: "Psychology-driven fitness tracking platform",
    description: "A fitness tracking app designed with psychological principles at its core. Uses Hick's Law (limited options) and cognitive load reduction through circular progress bars to keep users motivated and engaged with their fitness goals.",
    category: "concepts",
    year: "2024",
    services: "UX Strategy + Design",
    
    mockupImages: [],
    
    role: {
      title: "Product Designer",
      duration: "Feb 2024",
      team: "Personal Project",
      tools: ["Figma", "Principle"]
    },

    context: {
      problem: "Common difficulty for many users is lack of motivation, importance, and knowledge on how to train their body and stay fit. Users tend to lack motivation when work has to be done by themselves.",
      objective: "Create a fitness app that leverages psychological principles to reduce cognitive load and increase user engagement through simplified choices and visual progress tracking.",
      audience: "Fitness enthusiasts and beginners looking for motivation and guidance"
    },

    features: [
      {
        title: "Limited Options (Hick's Law)",
        description: "Provide limited workout options appropriate for users' preferences to simplify decision-making and reduce choice paralysis.",
        icon: "🎯"
      },
      {
        title: "Circular Progress Bars",
        description: "Visual progress tracking to keep users motivated and engaged by showing their advancement in real-time.",
        icon: "📊"
      },
      {
        title: "Activity Tracking",
        description: "Track calories, steps, sleep, water intake, and workout programs with clear visual feedback.",
        icon: "📱"
      },
      {
        title: "Friends & Community",
        description: "Social features to share progress, motivate friends, and build accountability within the fitness community.",
        icon: "👥"
      },
      {
        title: "Food Summary",
        description: "AI-powered food tracking where users can take pictures of meals and calculate calories automatically.",
        icon: "🍽️"
      }
    ],

    process: [
      { step: "Research", description: "Studied psychological principles and user motivation factors", icon: "🔍" },
      { step: "Psychology", description: "Applied Hick's Law and Cognitive Load theory to design decisions", icon: "🧠" },
      { step: "Screens", description: "Designed key screens including activity, friends feed, and food summary", icon: "📱" },
      { step: "Design System", description: "Created color palette (black, neon green, gray, white) and Inter font system", icon: "🎨" },
      { step: "Prototype", description: "Built interactive prototype showcasing core user flows", icon: "✨" }
    ],

    outcomes: [
      { metric: "Cognitive load", value: "Significantly reduced" },
      { metric: "Design system", value: "Consistent and scalable" },
      { metric: "User motivation", value: "Enhanced through visual progress" }
    ],

    reflection: "This project demonstrated how applying psychological principles like Hick's Law can directly impact user experience and motivation. The circular progress bars proved to be an effective visual tool for tracking and encouraging continued engagement.",

    links: {
      figma: "https://figma.com/fitness-app"
    }
  },

  "verasap": {
    id: "verasap",
    title: "Verasap",
    subtitle: "Social media platform with authentic connections",
    description: "A modern social media app designed to foster genuine connections and meaningful interactions through intuitive design and community-focused features.",
    category: "concepts",
    year: "2025",
    services: "Design",
    
    mockupImages: [],
    
    role: {
      title: "Product Designer",
      duration: "2025",
      team: "Personal Project",
      tools: ["Figma"]
    },

    context: {
      problem: "Modern social media platforms often prioritize engagement metrics over authentic human connections, leading to superficial interactions and user burnout.",
      objective: "Design a social platform that encourages meaningful conversations and genuine community building through thoughtful interaction design.",
      audience: "Social media users seeking authentic connections and meaningful engagement"
    },

    features: [
      {
        title: "Feed Experience",
        description: "Curated content feed that prioritizes quality interactions over endless scrolling.",
        icon: "📱"
      },
      {
        title: "Community Spaces",
        description: "Dedicated spaces for interest-based communities to connect and share.",
        icon: "👥"
      },
      {
        title: "Authentic Interactions",
        description: "Interaction patterns designed to encourage thoughtful responses over quick reactions.",
        icon: "💬"
      },
      {
        title: "Content Creation",
        description: "Intuitive tools for creating and sharing content that sparks conversations.",
        icon: "✨"
      }
    ],

    process: [
      { step: "Research", description: "Analyzed current social media patterns and user pain points", icon: "🔍" },
      { step: "Design", description: "Created UI components focused on clarity and authenticity", icon: "🎨" },
      { step: "Interaction", description: "Designed interaction patterns that promote meaningful engagement", icon: "💫" },
      { step: "Prototype", description: "Built high-fidelity mockups showcasing key features", icon: "📱" }
    ],

    outcomes: [
      { metric: "Design clarity", value: "Clean, intuitive interface" },
      { metric: "Interaction patterns", value: "Thoughtfully designed for authenticity" },
      { metric: "Visual system", value: "Cohesive and modern" }
    ],

    reflection: "Verasap explores how social media can be redesigned to prioritize human connection over metrics. The challenge was balancing familiar social patterns with new approaches that encourage depth over breadth in user interactions.",

    links: {
      figma: "https://figma.com/verasap"
    }
  }
};