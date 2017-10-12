import {injectable, unmanaged} from "inversify";
import {ILogger, LogLevel} from "./ILogger";
import {map, clone} from "lodash";

@injectable()
class ConsoleLogger implements ILogger {

    private logLevel = LogLevel.Debug;

    constructor(@unmanaged() private context: string[] = []) {

    }

    debug(message: string) {
        if (this.logLevel <= LogLevel.Debug)
            console.log(this.stringifyContext(this.context), message);
    }

    info(message: string) {
        if (this.logLevel <= LogLevel.Info)
            console.info(this.stringifyContext(this.context), message);
    }

    warning(message: string) {
        if (this.logLevel <= LogLevel.Warning)
            console.warn(this.stringifyContext(this.context), message);
    }

    error(error: string | Error) {
        console.error(this.stringifyContext(this.context), error);
    }

    setLogLevel(level: LogLevel) {
        this.logLevel = level;
    }

    createChildLogger(context: string) {
        let copy = map<string, string>(this.context, clone);
        copy.unshift(context);
        return new ConsoleLogger(copy);
    }

    private stringifyContext(context: string[]): string {
        return `[${context.join(".")}]`;
    }
}

export default ConsoleLogger
