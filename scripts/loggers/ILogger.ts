export enum LogLevel {
    Debug,
    Info,
    Warning,
    Error
}

export interface ILogger {
    debug(message: string);

    info(message: string);

    warning(message: string);

    error(error: string | Error);

    setLogLevel(level: LogLevel);

    createChildLogger?(context: string): ILogger;
}
