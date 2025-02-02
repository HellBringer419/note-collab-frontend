import { defineConfig } from "orval";

export default defineConfig({
  notecollab: {
    input: "../note-collab-backend/src/swagger.yaml",
    output: {
      client: "axios",
      httpClient: "axios",
      mode: "split",
      target: "./src/swagger/apis",
      schemas: "./src/swagger/model",
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
