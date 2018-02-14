import {ILogger, LogLevel} from "./ILogger";

export class NullLogger implements ILogger {


    debug(...messages: string[]) {
    }

    info(...messages: string[]) {
    }

    warning(...messages: string[]) {
    }

    error(...errors: (string | Error)[]) {
    }

    setLogLevel() {
        
    }

    createChildLogger(context: string): ILogger {
        return new NullLogger();
    }
}

export default new NullLogger()
