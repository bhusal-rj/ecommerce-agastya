export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DEVELOPMENT_URL: string;
    }
  }
}
