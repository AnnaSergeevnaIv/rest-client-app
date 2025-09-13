/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare module '*.scss' {
  const content: {
    [className: string]: string;
  };
  export default content;
}
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
type PartialWithRequired<T, K extends keyof T> = Pick<Required<T>, K> & Partial<T>;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
type Throwable = (err: unknown) => never;

declare namespace NodeJS {
  interface ProcessEnv {
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
