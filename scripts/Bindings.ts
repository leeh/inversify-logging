import {interfaces} from "inversify";
import {ILogger} from "./loggers/ILogger";
import ConsoleLogger from "./loggers/ConsoleLogger";

export function activateLogging(container: interfaces.Container) {
    if (!container.isBound("ILogger"))
        container.bind<ILogger>("ILogger").to(ConsoleLogger);
}
