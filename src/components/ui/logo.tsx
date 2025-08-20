import * as React from "react"

export default function Logo() {
  return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold relative group">
        <span className="before:content-['D'] before:absolute group-hover:before:animate-morph"></span>
      </h1>
    </div>
  );
}
