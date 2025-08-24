import React from "react";

const quotes = [
  {
    text: "Truly one of the best design collaborators I've worked with—thoughtful, fast, and detail-oriented.",
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
  {
    text: "Incredibly thoughtful and pragmatic—great partner to engineers and PMs.",
    author: "K. Lowden",
    role: "Staff Product Designer",
  },
  {
    text: "Incredibly thoughtful and pragmatic—great partner to engineers and PMs.",
    author: "K. Lowden",
    role: "Staff Product Designer",
  },
  {
    text: "Incredibly thoughtful and pragmatic—great partner to engineers and PMs.",
    author: "K. Lowden",
    role: "Staff Product Designer",
  },
  {
    text: "Incredibly thoughtful and pragmatic—great partner to engineers and PMs.",
    author: "K. Lowden",
    role: "Staff Product Designer",
  },
];

const Testimonials: React.FC = () => (
  <section id="references" className="relative min-h-screen flex flex-col justify-center py-12 sm:py-16 lg:py-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
      {quotes.map((q, i) => (
        <figure key={i} className="space-y-2 sm:space-y-3">
          <blockquote className="text-lg sm:text-xl lg:text-2xl text-foreground leading-relaxed">"{q.text}"</blockquote>
          <figcaption className="text-xs sm:text-sm text-muted-foreground">
            <span className="underline underline-offset-4">{q.author}</span>
            <span className="ml-2">{q.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;