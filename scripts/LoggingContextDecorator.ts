import {ILogger} from "./loggers/ILogger";

const POST_CONSTRUCT_KEY = "post_construct";
const TAGGED_PROPS_KEY = "inversify:tagged_props";
const CONTEXT_KEY = "inversify-logging:context";
const INIT_LOGGER = "__logger_init";
import {keys, find} from "lodash";

export function LoggingContext(context: string) {
    return function (target: any) {
        Reflect.defineMetadata(CONTEXT_KEY, context, target);
        target.prototype[INIT_LOGGER] = initContextLogger;
        Reflect.defineMetadata(POST_CONSTRUCT_KEY, {
            key: POST_CONSTRUCT_KEY,
            value: INIT_LOGGER
        }, target);
        return target;
    };
}

// This workaround is needed because inversify currently does not provide the current request when binding
// a service with toDynamicValue
export function initContextLogger() {
    let properties = Reflect.getMetadata(TAGGED_PROPS_KEY, this.constructor),
        loggerPropertyName = find(keys(properties), key => {
            return find(properties[key], (metadata: any) => (metadata.key === "inject" || metadata.key === "lazy_inject") && metadata.value === "ILogger");
        });

    return createChildLogger(this[loggerPropertyName], Reflect.getMetadata(CONTEXT_KEY, this.constructor));

}

export function createChildLogger(logger: ILogger, context: string) {
    if (logger && logger.createChildLogger)
        logger = logger.createChildLogger(context);

    return logger;
}
