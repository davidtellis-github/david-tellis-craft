// import React from "react";

// const Contact: React.FC = () => (
//   <section id="contact" className="relative min-h-screen flex flex-col justify-start  pt-[20vh]">
//     <div className="grid lg:grid-cols-2 gap-10 items-start">
      
//        <div className="flex flex-col item-centre">
//         <p className="text-2xl">I’m <span className="text-foreground text-loose font-medium">David Tellis</span><br></br> Let’s build something great.</p>
//          <ul className="list-disc  text-muted-foreground">
//           <li>Interested in product design roles with real user impact.</li>
//         </ul> 
//         <div className="pt-4 flex gap-6 text-lg">
//           <a href="mailto:david@tellis.design" className="underline underline-offset-4 hover:text-primary transition-colors">david@tellis.design</a>
//           <a href="https://linkedin.com/in/davidtellis" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">LinkedIn</a>
//         </div>
//         </div>
      
//       <aside className="border border-border rounded-lg overflow-hidden bg-card aspect-square max-h-100">
//         {/* Placeholder portrait block to keep layout balanced */}
//         <div className="h-100vw w-100vh grid place-items-center text-muted-foreground">Portrait</div>
//       </aside>
//     </div>
//   </section>
// );

// export default Contact;
import React from "react";
import profile from "/src/assets/portrait.jpg";
import ResumeModal from "./ResumeModal";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
const Contact: React.FC = () => (
  <section
    id="contact"
    className="relative min-h-screen flex flex-col justify-start py-[20vh]  lg: bg-background"
  >
    <div className="grid lg:grid-cols-2  items-start">
      
      {/* Left column - Text content */}
      <div className="flex flex-col gap-6">
        {/* Main intro line */}
        <p className="text-2xl leading-relaxed">
          I’m{" "}
          <span className="text-foreground font-medium">David Tellis</span>
          <br /> Let’s build something great.
        </p>

        {/* Short note */}
        <p className="text-muted-foreground">
          Interested in product design roles with real user impact.
        </p>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row sm:gap-8 gap-4 text-lg pt-2">
          <a
            href="mailto:david@tellis.design"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            david@tellis.design
          </a>
          <a
            href="https://www.linkedin.com/in/david-tellis-121576262/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>

        {/* Resume CTA */}
        <div className="pt-4">
          <ResumeModal>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Resume
            </Button>
          </ResumeModal>
        </div>
      </div>

      {/* Right column - Portrait */}
      <aside className="aspect-square overflow-hidden max-w-lg lg:max-w-xl  justify-self-center">
        <img
          src={profile} // 👉 replace with your actual image path
          alt="Portrait of David Tellis"
          className="w-full h-full object-cover rounded-lg"
        />
      </aside>
    </div>
  </section>
);

export default Contact;
