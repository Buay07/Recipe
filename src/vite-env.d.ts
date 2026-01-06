/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY_RECIPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
