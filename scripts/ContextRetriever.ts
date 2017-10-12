export class ContextRetriever {

    retrieve(constructor: Function, bindingName?: string): string {
        if (typeof window === "undefined")
            return constructor.name;
        let context = Reflect.getMetadata("inversify-logging:context", constructor);
        return context || bindingName;
    }
}

export let contextRetriever = new ContextRetriever();
