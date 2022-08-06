import { join } from "path";

function getPaths({ cwd }) {
  return {
    pagesPath: "src/pages",
    absSrcPath: cwd,
    absPagesPath: join(cwd, "src/pages"),
  };
}

export default getPaths;
