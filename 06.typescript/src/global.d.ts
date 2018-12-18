declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
  context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => any;
};

declare const module: {
  hot: {
    accept: (dependencies: string, callback: () => void) => void
  }
};