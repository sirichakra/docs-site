import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Sidebar from "@/src/components/Sidebar";
import TOC from "@/src/components/TOC";

export const revalidate = 60; // ✅ ISR

// 🔥 CRITICAL: This enables static generation
export async function generateStaticParams() {
  const basePath = path.join(process.cwd(), "src/content/docs");

  const locales = fs.readdirSync(basePath);

  let paths: any[] = [];

  locales.forEach((locale) => {
    const localePath = path.join(basePath, locale);
    const versions = fs.readdirSync(localePath);

    versions.forEach((version) => {
      const versionPath = path.join(localePath, version);
      const files = fs.readdirSync(versionPath);

      files.forEach((file) => {
        const slug = file.replace(".md", "");

        paths.push({
          locale,
          version,
          slug,
        });
      });
    });
  });

  return paths;
}

// Read markdown file
async function getDoc(locale: string, version: string, slug: string) {
  const filePath = path.join(
    process.cwd(),
    "src/content/docs",
    locale,
    version,
    `${slug}.md`
  );

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { content } = matter(fileContent);

  const processed = await remark().use(html).process(content);

  return processed.toString();
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; version: string; slug: string }>;
}) {
  const { locale, version, slug } = await params;
  const content = await getDoc(locale, version, slug);

  return (
    <div style={{ display: "flex" }}>
  <Sidebar locale={locale} version={version} />

  <main style={{ padding: "20px", flex: 1 }}>
    <div
      data-testid="doc-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </main>

  <TOC />
</div>
  );
}