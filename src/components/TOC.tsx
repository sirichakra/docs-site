"use client";

import { useEffect, useState } from "react";

export default function TOC() {
  const [headings, setHeadings] = useState<any[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h1, h2")
    ) as HTMLElement[];

    const items = elements.map((el) => {
      const id = el.innerText.replace(/\s+/g, "-").toLowerCase();
      el.id = id;

      return {
        id,
        text: el.innerText,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <aside style={{ width: "200px", padding: "10px" }}>
      <h3>Contents</h3>
      <ul>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              style={{
                color: active === h.id ? "red" : "black",
                fontWeight: active === h.id ? "bold" : "normal",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}