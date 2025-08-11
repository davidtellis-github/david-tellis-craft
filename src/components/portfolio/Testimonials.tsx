import React from "react";

const quotes = [
  {
    text: "Truly one of the best design collaborators I’ve worked with—thoughtful, fast, and detail-oriented.",
    author: "A. Chen",
    role: "Director of Product Design",
  },
  {
    text: "Has a rare blend of systems thinking and craft. Elevates teams and outcomes.",
    author: "S. Fields",
    role: "Senior UX Program Manager",
  },
  {
    text: "Brings clarity to ambiguous problems and ships with quality.",
    author: "D. Ong",
    role: "Product Designer",
  },
  {
    text: "Incredibly thoughtful and pragmatic—great partner to engineers and PMs.",
    author: "K. Lowden",
    role: "Staff Product Designer",
  },
];

const Testimonials: React.FC = () => (
  <section id="references" className="pt-28">
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">References</h2>
    <div className="grid md:grid-cols-2 gap-10">
      {quotes.map((q, i) => (
        <figure key={i} className="space-y-3">
          <blockquote className="text-xl text-foreground leading-relaxed">“{q.text}”</blockquote>
          <figcaption className="text-sm text-muted-foreground">
            <span className="underline underline-offset-4">{q.author}</span>
            <span className="ml-2">{q.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
