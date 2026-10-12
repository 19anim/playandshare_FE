import { defineConfig, minimal2023Preset } from "@vite-pwa/assets-generator/config";

// Regenerate icons with: npx pwa-assets-generator
export default defineConfig({
  preset: {
    ...minimal2023Preset,
    // Pad maskable / iOS icons with the brand red instead of white
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: "#e60023" } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: "#e60023" } },
  },
  images: ["public/pwa-icon.svg"],
});
