import path from "node:path";
import type { NextConfig } from "next";

// Static export: GitHub Pages serves the `out/` folder at muzaffarov.uz.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: { root: path.resolve(".") },
};

export default config;
