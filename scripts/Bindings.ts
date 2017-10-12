import {interfaces} from "inversify";
import {ILogger} from "./loggers/ILogger";
import ConsoleLogger from "./loggers/ConsoleLogger";
import {ContextRetriever} from "./ContextRetriever";

export function contextMiddleware(planAndResolve) {
    let contextRetriever = new ContextRetriever();
    return (args) => {
        let nextContextInterceptor = args.contextInterceptor,
            currentServiceId = args.serviceIdentifier,
            target = null,
            bindingName = null;
        args.contextInterceptor = (context: interfaces.Context) => {
            target = context.plan.rootRequest.target;
            bindingName = context.plan.rootRequest.serviceIdentifier;
            return nextContextInterceptor(context);
        };
        let service = planAndResolve(args);
        if (currentServiceId === "ILogger") {
            let logger = <ILogger>service;
            if (logger.createChildLogger)
                return logger.createChildLogger(contextRetriever.retrieve(target, bindingName));
        }
        return service;
    };
}

export function bindLoggingInto(container: interfaces.Container): void {
    container.applyMiddleware(contextMiddleware);
    container.bind<ILogger>("ILogger").to(ConsoleLogger);
}
