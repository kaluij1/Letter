/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  process.env.NEXT_PUBLIC_REPO_NAME ??
  "Letter";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
