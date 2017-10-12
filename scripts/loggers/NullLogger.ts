import {ILogger, LogLevel} from "./ILogger";

export class NullLogger implements ILogger {


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
        return new NullLogger();
    }
}

export default new NullLogger()
