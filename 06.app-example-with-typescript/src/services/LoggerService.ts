// tslint:disable: no-console

export enum LogLevel {
  Trace = 0,
  Debug = 1,
  Info = 2,
  Warning = 3,
  Error = 4,
  NoLogging = 5,
}

enum LogType {
  Trace = 0,
  Log = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Table = 5,
  Dir = 6,
}

export class Logger {
  private logLevel: LogLevel = LogLevel.Debug

  constructor(core: jc.Core, logLevel: LogLevel = LogLevel.Trace) {
    this.logLevel = logLevel
  }

  public trace(): void { this.sink(LogLevel.Trace, LogType.Trace) }
  public table(...args: any[]): void { this.sink(LogLevel.Debug, LogType.Table, args) }
  public log(...args: any[]): void { this.sink(LogLevel.Debug, LogType.Log, args) }
  public dir(...args: any[]): void { this.sink(LogLevel.Debug, LogType.Dir, args) }
  public info(...args: any[]): void { this.sink(LogLevel.Info, LogType.Info, args) }
  public warn(...args: any[]): void { this.sink(LogLevel.Warning, LogType.Warn, args) }
  public error(...args: any[]): void { this.sink(LogLevel.Error, LogType.Error, args) }
  public clear(): void { console.clear() }

  public setLevel(level: LogLevel): void { this.logLevel = level }

  private sink(level: LogLevel, type: LogType, args?: any[]): void {
    if (this.logLevel <= level) {
      const logPrefix = `[${LogLevel[level].toUpperCase()}] `
      switch (type) {
        case LogType.Trace: return console.trace()
        case LogType.Error: return console.error(logPrefix, args)
        case LogType.Warn: return console.warn(logPrefix, args)
        case LogType.Info: return console.info(logPrefix, args)
        case LogType.Log: return console.log(logPrefix, args)
        case LogType.Table: return console.table(args)
        case LogType.Dir: return console.dir(args)
      }
    }
  }
}
