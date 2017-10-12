export class ContextRetriever {

    retrieve(constructor: Function, bindingName?: string): string {
        return "";
    }
}

export let contextRetriever = new ContextRetriever();
