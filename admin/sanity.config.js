import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { singletonTools } from "sanity-plugin-singleton-tools";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "admin",

  projectId: "8jk01449",
  dataset: "production",

  plugins: [structureTool(), visionTool(), singletonTools()],

  schema: {
    types: schemaTypes,
  },
});
