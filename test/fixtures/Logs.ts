import {inject} from "inversify";
import {ILogger, LogLevel} from "../../scripts/loggers/ILogger";
import {LoggingContext} from "../../scripts";

export class NonLoggableClass {

    private test;
}

@LoggingContext("LoggableClass")
export class LoggableClass {

    private test;
    @inject("ILogger")
    private logging: ILogger;
}

export class ContextualLogger implements ILogger {

    debug(message: string) {
    }

    info(message: string) {
    }

    warning(message: string) {
    }

    error(error: string | Error) {
    }

    setLogLevel(level: LogLevel) {
    }

    createChildLogger(context: string): ILogger {
        return null;
    }
}

