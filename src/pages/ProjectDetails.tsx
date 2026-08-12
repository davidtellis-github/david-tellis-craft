import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projectsData } from "@/data/projectData";
import { IdeabaazCaseStudy } from "@/components/portfolio/IdeabaazCaseStudy";
import { FuturcraftCaseStudy } from "@/components/portfolio/FuturcraftCaseStudy";
import { VybeCaseStudy } from "@/components/portfolio/VybeCaseStudy";
import { BamCaseStudy } from "@/components/portfolio/BamCaseStudy";
import { DefaultCaseStudy } from "@/components/portfolio/DefaultCaseStudy";

const ProjectDetails: React.FC = () => {
  const { slug } = useParams();

  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = slug ? projectsData[slug] : null;

  // SEO setup
  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Project Case Study`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", project.description);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-end justify-center">
        <div className="text-end">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Every project shares the same single-column case study layout (logo +
  // back button header, hero, chapters). Projects with bespoke narratives
  // get their own component; everything else uses the generic renderer.
  switch (project.id) {
    case "vybe":
      return <VybeCaseStudy project={project} />;
    case "bam":
      return <BamCaseStudy project={project} />;
    case "ideabaaz":
      return <IdeabaazCaseStudy project={project} />;
    case "futurcraft-ai":
      return <FuturcraftCaseStudy project={project} />;
    default:
      return <DefaultCaseStudy project={project} />;
  }
};

export default ProjectDetails;
