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

export class SimpleLogger implements ILogger {
    debug(message: string) {
        throw new Error("Method not implemented.");
    }

    info(message: string) {
        throw new Error("Method not implemented.");
    }

    warning(message: string) {
        throw new Error("Method not implemented.");
    }

    error(error: string | Error) {
        throw new Error("Method not implemented.");
    }

    setLogLevel(level: LogLevel) {
        throw new Error("Method not implemented.");
    }

}
