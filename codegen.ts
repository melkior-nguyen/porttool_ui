import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.VITE_URL ?? "https://stagging.port.tools/graphql/",
  documents: ["./src/**/*.gql"],
  generates: {
    "./src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
    },
  },
};

export default config;
