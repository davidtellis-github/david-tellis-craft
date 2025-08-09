import React from "react";

const values = [
  { title: "Systems first", body: "Design holistically. Components, constraints, and language that scale." },
  { title: "Craft matters", body: "Precision and clarity from research to redlines." },
  { title: "Bias to ship", body: "Collaborate closely, prototype often, deliver value." },
  { title: "Kind and direct", body: "Clear writing, candid feedback, and empathy for partners." },
];

const ValuesSection: React.FC = () => (
  <section id="values" className="pt-28">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">Values</h2>
    <div className="grid md:grid-cols-2 gap-8 text-muted-foreground">
      {values.map((v) => (
        <article key={v.title} className="space-y-2">
          <h3 className="text-xl text-foreground font-medium">{v.title}</h3>
          <p>{v.body}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ValuesSection;
