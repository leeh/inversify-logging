function Context(context: string) {
    return function (target: any) {
        Reflect.defineMetadata("inversify-logging:context", context, target);
        return target;
    };
}

export default Context
