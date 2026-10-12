import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "pwa-icon.svg"],
      manifest: {
        name: "Play and Share",
        short_name: "Play & Share",
        description: "Khám phá địa điểm, lên lịch trình và chia tiền du lịch cùng bạn bè.",
        lang: "vi",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#e60023",
        background_color: "#ffffff",
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          { name: "Chia tiền", url: "/calculator", icons: [{ src: "pwa-192x192.png", sizes: "192x192" }] },
          { name: "Timeline", url: "/schedule", icons: [{ src: "pwa-192x192.png", sizes: "192x192" }] },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        // The PDF library + font (~2MB) are only needed for export: cache them on first use
        // instead of making every install download them
        globIgnores: ["**/pdfmake-*.js", "**/vfs_fonts-*.js"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) =>
              sameOrigin && /\/assets\/(pdfmake|vfs_fonts)-.*\.js$/.test(url.pathname),
            handler: "CacheFirst",
            options: {
              cacheName: "pdf-export",
              expiration: { maxEntries: 4 },
            },
          },
        ],
        // API calls (playandshare.onrender.com) are cross-origin and never cached,
        // so signed-in data always comes from the network
      },
    }),
  ],
});
