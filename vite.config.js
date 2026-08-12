import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        admin: "admin/index.html",
        login: "admin/login.html",
        dashboard: "admin/dashboard.html",
        addProperty: "admin/add-property.html"
      }
    }
  }
});