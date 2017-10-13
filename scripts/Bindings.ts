import {interfaces} from "inversify";
import {ILogger} from "./loggers/ILogger";
import ConsoleLogger from "./loggers/ConsoleLogger";
import {ContextRetriever} from "./ContextRetriever";


export function activateLogging(container: interfaces.Container): LoggingToSyntax {
    if (!container.isBound("ILoggerFactory"))
        container.bind<interfaces.Factory<ILogger>>("ILoggerFactory").toFactory<ILogger>(() => {
            return () => {
                return new ConsoleLogger();
            };
        });
    return new LoggingToSyntax(container);
}

export class LoggingToSyntax {

    constructor(private container: interfaces.Container) {

    }

    to(constructor: Function, bindingName?: string): LoggingToSyntax {
        this.container.bind<ILogger>("ILogger").toDynamicValue(() => {
            let contextRetriever = new ContextRetriever(),
                logger = this.container.get<() => ILogger>("ILoggerFactory")();
            return logger.createChildLogger ? logger.createChildLogger(contextRetriever.retrieve(constructor, bindingName)) : logger;
        }).whenInjectedInto(constructor);

        return this;
    }
}
