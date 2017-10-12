import "reflect-metadata";
import expect = require("expect.js");
import {ContextRetriever} from "../scripts/ContextRetriever";
import PlainClass from "./fixtures/PlainClass";
import DecoratedClass from "./fixtures/DecoratedClass";

describe("Given a context retriever and a constructor", () => {

    let subject: ContextRetriever;

    beforeEach(() => {
        subject = new ContextRetriever();
    });

    context("when running on nodejs", () => {
        it("should use the constructor name as context", () => {
            expect(subject.retrieve(PlainClass)).to.be("PlainClass");
        });
    });

    context("when running on the frontend", () => {
        beforeEach(() => {
            (<any>global).window = {};
        });
        context("when there's a logging decorator on the constructor", () => {
            it("should use that name", () => {
                expect(subject.retrieve(DecoratedClass)).to.be("CustomContext");
            });
        });

        context("when there isn't a logging decorator on the constructor", () => {
            it("should use the binding name", () => {
                expect(subject.retrieve(PlainClass, "IPlainClass")).to.be("IPlainClass");
            });
        });
    });
});
