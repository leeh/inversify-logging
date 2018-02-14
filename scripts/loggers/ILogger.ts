export enum LogLevel {
    Debug,
    Info,
    Warning,
    Error
}

export interface ILogger {
    debug(...messages: string[]);

    info(...messages: string[]);

    warning(...messages: string[]);

    error(...errors: (string | Error)[]);

    /* @deprecated: use ILoggerConfig */
    setLogLevel?(level: LogLevel);

    createChildLogger(context: string): ILogger;
}

export interface ILoggerConfig {
    logLevel: LogLevel;
}

export class DefaultLoggerConfig implements ILoggerConfig {
    logLevel: LogLevel.Debug
}