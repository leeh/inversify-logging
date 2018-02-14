import {injectable, inject, optional} from "inversify";
import {ILogger, LogLevel, ILoggerConfig} from "./ILogger";
import {map, clone} from "lodash";

@injectable()
class ConsoleLogger implements ILogger {
    private context: string[] = [];

    constructor(@inject("ILoggerConfig") @optional() private config: ILoggerConfig) {

    }

    debug(...messages: string[]) {
        if (this.config.logLevel <= LogLevel.Debug)
            console.log(this.stringifyContext(this.context), ...messages);
    }

    info(...messages: string[]) {
        if (this.config.logLevel <= LogLevel.Info)
            console.info(this.stringifyContext(this.context), ...messages);
    }

    warning(...messages: string[]) {
        if (this.config.logLevel <= LogLevel.Warning)
            console.warn(this.stringifyContext(this.context), ...messages);
    }

    error(...errors: (string | Error)[]) {
        console.error(this.stringifyContext(this.context), ...errors);
    }

    createChildLogger(context: string): ILogger {
        let copy = map<string, string>(this.context, clone);
        if (context) copy.push(context);
        let logger = new ConsoleLogger(this.config);
        logger.setContext(copy);
        return logger;
    }

    setContext(context: string[]) {
        this.context = context;
    }

    private stringifyContext(context: string[]): string {
        return context.length ? `[${context.join(".")}]` : "";
    }
}

export default ConsoleLogger
