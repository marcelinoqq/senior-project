import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          decodeURI(req.url); // This will throw if the URL is malformed
        } catch (e) {
          console.error("🚨 Malformed URI requested:", req.url);
        }
        next();
      });
    },
  },
});
