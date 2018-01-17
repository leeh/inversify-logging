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

    setLogLevel(level: LogLevel);

    createChildLogger(context: string): ILogger;
}
