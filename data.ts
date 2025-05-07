import * as Icons from "lucide-react";
type IconName = keyof typeof Icons;

type Feature = {
  icon: IconName;
  title: string;
  description: string;
};
export const snippets = [
  {
    title: "ReactJS Component",
    language: "jsx",
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
  },
  {
    title: "Python Function",
    language: "python",
    code: `def fibonacci(n):
    """Return the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b`,
  },
  {
    title: "CSS Animation",
    language: "css",
    code: `@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animated-element {
  animation: pulse 2s infinite ease-in-out;
}`,
  },
];

export const features: Feature[] = [
  {
    icon: "Save",
    title: "Save & Organize",
    description:
      "Store all your code snippets in one place with smart tagging and folders",
  },
  {
    icon: "Search",
    title: "Instant Search",
    description:
      "Find any snippet in milliseconds with our powerful search engine",
  },
  {
    icon: "Share2",
    title: "Share Securely",
    description:
      "Share snippets with your team or keep them private with granular permissions",
  },
  {
    icon: "Code2",
    title: "Syntax Highlighting",
    description:
      "Support for 100+ programming languages with beautiful syntax highlighting",
  },
  {
    icon: "RefreshCcw",
    title: "Sync Anywhere",
    description:
      "Access your snippets from any device with real-time synchronization",
  },
  {
    icon: "Bolt",
    title: "Keyboard Shortcuts",
    description: "Boost your productivity with customizable keyboard shortcuts",
  },
];

export const testimonials = [
  {
    text: "SnipVault has transformed how our team shares and reuses code. It's an essential tool in our development workflow.",
    author: "Sarah Chen",
    role: "Lead Developer at TechFlow",
  },
  {
    text: "The search functionality is lightning fast, and the organization features help me keep all my snippets neatly categorized.",
    author: "Marcus Johnson",
    role: "Full-Stack Engineer",
  },
  {
    text: "I've tried many snippet managers, but SnipVault's user experience and feature set are unmatched. Worth every penny!",
    author: "Aisha Patel",
    role: "Software Architect",
  },
];
