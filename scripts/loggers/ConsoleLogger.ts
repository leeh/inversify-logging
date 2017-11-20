import {injectable} from "inversify";
import {ILogger, LogLevel} from "./ILogger";
import {map, clone} from "lodash";
import * as EventEmitter from "events";

const emitter = new EventEmitter();
emitter.setMaxListeners(100);

@injectable()
class ConsoleLogger implements ILogger {

    private logLevel = LogLevel.Debug;
    private context: string[] = [];

    constructor() {
        emitter.on("logLevelChange", (level) => this.logLevel = level);
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
