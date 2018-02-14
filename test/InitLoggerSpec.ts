import "reflect-metadata";
import expect = require("expect.js");
import {Mock, Times} from "typemoq";
import {ContextualLogger, LoggableClass, NonLoggableClass} from "./fixtures/Logs";
import {initContextLogger} from "../scripts/LoggingContextDecorator";

describe("Given an object", () => {

    context("when has got a logger property", () => {
        context("when the logger is contextual", () => {
            it("should create a child logger", () => {
                let object = new LoggableClass();
                let logger = Mock.ofType(ContextualLogger);
                (<any>object).logging = logger.object;
                initContextLogger.call(object);

                logger.verify(l => l.createChildLogger("LoggableClass"), Times.once());
            });
        });
    });

    context("when hasn't got a logger property", () => {
        it("should not thrown an error", () => {
            let object = new NonLoggableClass();
            let logger = Mock.ofType(ContextualLogger);
            (<any>object).logging = logger.object;

            expect(() => {
                initContextLogger.call(object);
            }).not.to.throwError();
        });
    });
});
