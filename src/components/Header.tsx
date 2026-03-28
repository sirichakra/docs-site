"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";

const languages = ["en", "es", "fr", "de"];

export default function Header() {
  const pathname = usePathname();

  return (
    
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Search />
      <div data-testid="language-switcher">
        {languages.map((lang) => {
          const newPath = pathname.replace(/^\/(en|es|fr|de)/, `/${lang}`);

          return (
            <Link key={lang} href={newPath} style={{ marginRight: "10px" }}>
              {lang.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </header>
  );
}