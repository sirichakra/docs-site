import fs from "fs";
import path from "path";
import { Index } from "flexsearch";

type Doc = {
  id: string;
  title: string;
  content: string;
  url: string;
};

const index = new Index({ tokenize: "forward" });
let documents: Doc[] = [];

export function buildSearchIndex() {
  const basePath = path.join(process.cwd(), "src/content/docs");

  const locales = fs.readdirSync(basePath);

  let id = 0;

  locales.forEach((locale) => {
    const localePath = path.join(basePath, locale);
    const versions = fs.readdirSync(localePath);

    versions.forEach((version) => {
      const versionPath = path.join(localePath, version);
      const files = fs.readdirSync(versionPath);

      files.forEach((file) => {
        const filePath = path.join(versionPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        const slug = file.replace(".md", "");

        const doc: Doc = {
          id: String(id),
          title: slug,
          content,
          url: `/${locale}/docs/${version}/${slug}`,
        };

        index.add(id, content);
        documents.push(doc);

        id++;
      });
    });
  });
}

export function searchDocs(query: string) {
  const results = index.search(query);

  return results.map((id: any) =>
    documents.find((doc) => doc.id === String(id))
  );
}