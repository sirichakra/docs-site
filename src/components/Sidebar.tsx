import fs from "fs";
import path from "path";
import Link from "next/link";

type Props = {
  locale: string;
  version: string;
};

export default function Sidebar({ locale, version }: Props) {
  const basePath = path.join(
    process.cwd(),
    "src/content/docs",
    locale,
    version
  );

  let files: string[] = [];

  try {
    files = fs.readdirSync(basePath);
  } catch (err) {
    return <div>No docs found</div>;
  }

  return (
    <aside style={{ width: "200px", padding: "10px" }}>
      <h3>Docs</h3>
      <ul>
        {files.map((file) => {
          const slug = file.replace(".md", "");

          return (
            <li key={slug}>
              <Link href={`/${locale}/docs/${version}/${slug}`}>
                {slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}