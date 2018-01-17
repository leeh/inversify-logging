import {injectable} from "inversify";
import {ILogger, LogLevel} from "./ILogger";
import {map, clone} from "lodash";
import * as EventEmitter from "events";

const emitter = new EventEmitter();
emitter.setMaxListeners(999);

@injectable()
class ConsoleLogger implements ILogger {
    private logLevel = LogLevel.Debug;
    private context: string[] = [];

    constructor() {
        emitter.on("logLevelChange", (level) => this.logLevel = level);
    }

    debug(...messages: string[]) {
        if (this.logLevel <= LogLevel.Debug)
            console.log(this.stringifyContext(this.context), ...messages);
    }

    info(...messages: string[]) {
        if (this.logLevel <= LogLevel.Info)
            console.info(this.stringifyContext(this.context), ...messages);
    }

    warning(...messages: string[]) {
        if (this.logLevel <= LogLevel.Warning)
            console.warn(this.stringifyContext(this.context), ...messages);
    }

    error(...errors: (string | Error)[]) {
        console.error(this.stringifyContext(this.context), ...errors);
    }

    setLogLevel(level: LogLevel) {
        emitter.emit("logLevelChange", level);
    }

    createChildLogger(context: string): ILogger {
        let copy = map<string, string>(this.context, clone);
        if (context) copy.push(context);
        let logger = new ConsoleLogger();
        logger.setContext(copy);
        (<any>logger).logLevel = this.logLevel;
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
