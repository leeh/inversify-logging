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

export function initContextLogger() {
    let properties = Reflect.getMetadata(TAGGED_PROPS_KEY, this.constructor),
        loggerPropertyName = find(keys(properties), key =>  {
            return find(properties[key], (metadata: any) => (metadata.key === "inject" || metadata.key === "lazy_inject") && metadata.value === "ILogger");
        }),
        logger = this[loggerPropertyName];

    if (!logger) return;

    if (logger.createChildLogger)
        this[loggerPropertyName] = this[loggerPropertyName].createChildLogger(Reflect.getMetadata(CONTEXT_KEY, this.constructor));

}

