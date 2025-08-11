import React from "react";

const Contact: React.FC = () => (
  <section id="contact" className="min-h-screen w-full flex items-center pt-28 pb-24">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Contact</h2>
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <div className="space-y-4">
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>Interested in product design roles with real user impact.</li>
        </ul>
        <p className="text-2xl">I’m <span className="text-foreground font-medium">David Tellis</span>. Let’s build something great.</p>
        <div className="pt-4 flex gap-6 text-lg">
          <a href="mailto:david@tellis.design" className="underline underline-offset-4 hover:text-primary transition-colors">david@tellis.design</a>
          <a href="https://linkedin.com/in/davidtellis" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
      <aside className="border border-border rounded-lg overflow-hidden bg-card aspect-square max-h-96">
        {/* Placeholder portrait block to keep layout balanced */}
        <div className="h-full w-full grid place-items-center text-muted-foreground">Portrait</div>
      </aside>
    </div>
  </section>
);

export default Contact;
