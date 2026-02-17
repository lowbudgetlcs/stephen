/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DENNYS_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
