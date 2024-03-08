// vite.config.js
import { defineConfig } from "file:///D:/AmitUpadhyay_MultiQos/AmitLive/namascapeweb/admin/node_modules/vite/dist/node/index.js";
import react from "file:///D:/AmitUpadhyay_MultiQos/AmitLive/namascapeweb/admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///D:/AmitUpadhyay_MultiQos/AmitLive/namascapeweb/admin/node_modules/vite-plugin-pwa/dist/index.js";

// public/site.manifest.json
var site_manifest_default = {
  short_name: "Namascape-Admin-panel",
  description: "Admin Panel for Namascape -Event-Management",
  name: "Namascape-Admin-panel",
  icons: [
    {
      src: "/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "monochrome"
    },
    {
      src: "/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
      purpose: "any"
    },
    {
      src: "/maskable_icon.png",
      sizes: "225x225",
      type: "image/png",
      purpose: "maskable"
    }
  ],
  theme_color: "#B09684",
  background_color: "#e8ebf2",
  display: "standalone",
  scope: "/admin-namascape",
  start_url: "/admin-namascape",
  orientation: "portrait"
};

// vite.config.js
var vite_config_default = defineConfig({
  base: "/admin-namascape/",
  plugins: [
    react(),
    VitePWA({
      manifest: site_manifest_default,
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,jpeg,svg,json}"]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicHVibGljL3NpdGUubWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXEFtaXRVcGFkaHlheV9NdWx0aVFvc1xcXFxBbWl0TGl2ZVxcXFxuYW1hc2NhcGV3ZWJcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFtaXRVcGFkaHlheV9NdWx0aVFvc1xcXFxBbWl0TGl2ZVxcXFxuYW1hc2NhcGV3ZWJcXFxcYWRtaW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0FtaXRVcGFkaHlheV9NdWx0aVFvcy9BbWl0TGl2ZS9uYW1hc2NhcGV3ZWIvYWRtaW4vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnXHJcbmltcG9ydCBNYW5pZmVzdCBmcm9tICcuL3B1YmxpYy9zaXRlLm1hbmlmZXN0Lmpzb24nXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOlwiL2FkbWluLW5hbWFzY2FwZS9cIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIFZpdGVQV0Eoe1xyXG4gICAgICAgICAgbWFuaWZlc3Q6TWFuaWZlc3QsXHJcbiAgICAgICAgICB3b3JrYm94OiB7XHJcbiAgICAgICAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHBuZyxqcGcsanBlZyxzdmcsanNvbn0nXVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIF1cclxufSlcclxuIiwgIntcclxuICAgIFwic2hvcnRfbmFtZVwiOiBcIk5hbWFzY2FwZS1BZG1pbi1wYW5lbFwiLFxyXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFkbWluIFBhbmVsIGZvciBOYW1hc2NhcGUgLUV2ZW50LU1hbmFnZW1lbnRcIixcclxuICAgIFwibmFtZVwiOiBcIk5hbWFzY2FwZS1BZG1pbi1wYW5lbFwiLFxyXG4gICAgXCJpY29uc1wiOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNyY1wiOiBcIi9hbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgXCJwdXJwb3NlXCI6IFwibW9ub2Nocm9tZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic3JjXCI6IFwiL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgICBcInB1cnBvc2VcIjogXCJhbnlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNyY1wiOiBcIi9hcHBsZS10b3VjaC1pY29uLnBuZ1wiLFxyXG4gICAgICAgICAgICBcInNpemVzXCI6IFwiMTgweDE4MFwiLFxyXG4gICAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzcmNcIjogXCIvbWFza2FibGVfaWNvbi5wbmdcIixcclxuICAgICAgICAgICAgXCJzaXplc1wiOiBcIjIyNXgyMjVcIixcclxuICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcclxuICAgICAgICB9XHJcbiAgICBdLFxyXG4gICAgXCJ0aGVtZV9jb2xvclwiOiBcIiNCMDk2ODRcIixcclxuICAgIFwiYmFja2dyb3VuZF9jb2xvclwiOiBcIiNlOGViZjJcIixcclxuICAgIFwiZGlzcGxheVwiOiBcInN0YW5kYWxvbmVcIixcclxuICAgIFwic2NvcGVcIjogXCIvYWRtaW4tbmFtYXNjYXBlXCIsXHJcbiAgICBcInN0YXJ0X3VybFwiOiBcIi9hZG1pbi1uYW1hc2NhcGVcIixcclxuXHJcbiAgICBcIm9yaWVudGF0aW9uXCI6IFwicG9ydHJhaXRcIlxyXG59XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdWLFNBQVMsb0JBQW9CO0FBQ3JYLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7OztBQ0Z4QjtBQUFBLEVBQ0ksWUFBYztBQUFBLEVBQ2QsYUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsT0FBUztBQUFBLElBQ0w7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxNQUNSLFNBQVc7QUFBQSxJQUNmO0FBQUEsSUFDQTtBQUFBLE1BQ0ksS0FBTztBQUFBLE1BQ1AsT0FBUztBQUFBLE1BQ1QsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDSSxLQUFPO0FBQUEsTUFDUCxPQUFTO0FBQUEsTUFDVCxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxNQUNJLEtBQU87QUFBQSxNQUNQLE9BQVM7QUFBQSxNQUNULE1BQVE7QUFBQSxNQUNSLFNBQVc7QUFBQSxJQUNmO0FBQUEsRUFDSjtBQUFBLEVBQ0EsYUFBZTtBQUFBLEVBQ2Ysa0JBQW9CO0FBQUEsRUFDcEIsU0FBVztBQUFBLEVBQ1gsT0FBUztBQUFBLEVBQ1QsV0FBYTtBQUFBLEVBRWIsYUFBZTtBQUNuQjs7O0FEL0JBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQUs7QUFBQSxFQUNMLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNKLFVBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNMLGNBQWMsQ0FBQywwQ0FBMEM7QUFBQSxNQUM3RDtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0w7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
