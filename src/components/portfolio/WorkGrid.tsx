import React from "react";
import { Link } from "react-router-dom";
import w1 from "@/assets/work-1.jpg";
import w2 from "@/assets/work-2.jpg";
import w3 from "@/assets/work-3.jpg";
import w4 from "@/assets/work-4.jpg";
import w5 from "@/assets/work-5.jpg";
import w6 from "@/assets/work-6.jpg";
import w7 from "@/assets/work-7.jpg";
import w8 from "@/assets/work-8.jpg";
import w9 from "@/assets/work-9.jpg";

const projects = [
  { 
    title: "Design System Platform", 
    img: w1, 
    slug: "design-system-platform",
    description: "We built a comprehensive design system that scales across multiple product teams, improving consistency and development velocity.",
    details: [
      "Determine the design principles and component architecture for scalable systems.",
      "Develop a plan for adoption across engineering teams and design workflows.",
      "Create documentation and governance for long-term maintenance."
    ]
  },
  { 
    title: "Insights Dashboard", 
    img: w2, 
    slug: "insights-dashboard",
    description: "A data visualization platform that transforms complex analytics into actionable business insights.",
    details: [
      "Transform raw data into meaningful visual narratives for stakeholders.",
      "Design intuitive interfaces that make complex data accessible.",
      "Implement real-time updates and interactive exploration features."
    ]
  },
  { 
    title: "Mobile Banking IA", 
    img: w3, 
    slug: "mobile-banking-ia",
    description: "Redesigned information architecture for a mobile banking app serving millions of users.",
    details: [
      "Restructure complex financial workflows into intuitive user journeys.",
      "Ensure security compliance while maintaining seamless user experience.",
      "Optimize for accessibility and performance across diverse user needs."
    ]
  },
  { 
    title: "Commerce Checkout", 
    img: w4, 
    slug: "commerce-checkout",
    description: "Streamlined checkout experience that reduced cart abandonment and increased conversion rates.",
    details: [
      "Simplify the purchase flow while maintaining payment security standards.",
      "Design for multiple payment methods and international requirements.",
      "Implement progressive disclosure to reduce cognitive load during checkout."
    ]
  },
];

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="min-h-screen flex flex-col justify-center py-20">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div className="text-sm tracking-widest text-muted-foreground uppercase">
            [ PORTFOLIO ]
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-2">(prjcts)</div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
              WHAT WE<br />CAN DO
            </h2>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={project.title} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Number */}
                <div className="lg:col-span-1">
                  <div className="text-2xl font-bold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Complete solution<br />from 0 to 100%
                  </div>
                </div>
                
                {/* Title */}
                <div className="lg:col-span-3">
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight">
                    {project.title}
                  </h3>
                  {index === 0 && (
                    <Link
                      to={`/work/${project.slug}`}
                      className="inline-block mt-4 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium tracking-wide"
                    >
                      VIEW CASE STUDY
                    </Link>
                  )}
                </div>
                
                {/* Description */}
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-foreground">
                    {project.description}
                  </p>
                  <ul className="space-y-2">
                    {project.details.map((detail, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Arrow */}
                <div className="lg:col-span-2 flex justify-end">
                  <Link
                    to={`/work/${project.slug}`}
                    className="group"
                    aria-label={`View case study: ${project.title}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform duration-300">
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                      >
                        <path 
                          d="M7 17L17 7M17 7H7M17 7V17" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
