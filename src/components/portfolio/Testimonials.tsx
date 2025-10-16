import React from "react";

const quotes = [
  {
    text: "Creative, clear, and collaborative! David makes every project smoother, smarter, and genuinely more fun.",
    author: "Karthik.R",
    role: "Sr. Graphic Designern",
  },
  {
    text: "⁠Trust David with a vision, and he’ll return with something better than you imagined. Every single time",
    author: "Jaffrina Joseph",
    role: "Associate Product Manager",
  },
  {
    text: "David was one of the first people who mentored me in this field. He really taught me that 'Less is more', Overall super chill but hardworking person to have in your team! ",
    author: "Jahnavi",
    role: "Product Designer",
  },
  {
    text: "David is highly meticulous and takes ownership of his projects, He explores different methods to express ideas both artistically and functionally, keeping project goals in mind. David doesn't 'work'; he does what he loves. ",
    author: "Amisha Jha",
    role: "Content Writer",
  },
  {
    text: "Your approach towards problem-solving and reasoning out solutions while going with bold design choices has fascinated me a few times. It's been great working with you because you listen with intention, you understand and ask questions, and then you execute well.. ",
    author: "Chris",
    role: "UX designer",
  },
];

const Testimonials: React.FC = () => (
  <section id="references" className="relative min-h-screen flex flex-col justify-start py-[20vh]">
    <div className="grid md:grid-cols-2 gap-[10vh]">
      {quotes.map((q, i) => (
        <figure key={i} className="space-y-1">
          <blockquote className="text-3xl text-foreground leading-tight">“{q.text}”</blockquote>
          <figcaption className="text-sm text-muted-foreground">
            <span className="underline underline-offset-4 text-foreground">{q.author}</span>
            <span className="ml-2">{q.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

export default Testimonials;
