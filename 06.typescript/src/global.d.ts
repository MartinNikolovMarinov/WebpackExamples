declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
  context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => any;
};

declare var module: {
  hot: {
    accept: (dependencies: string, callback: () => void) => void
  }
};

declare var process: {
  env: {
    NODE_ENV: string
  }
}

declare module '*.css' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}