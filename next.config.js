/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export statique -> dossier `out/` déployé sur Cloudflare Pages.
  // L'API du chatbot est servie par une Pages Function (functions/api/chat.js).
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
