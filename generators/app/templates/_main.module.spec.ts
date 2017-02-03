import * as chai from 'chai';
import { add } from "./main.module";

const expect = chai.expect;

describe("<%=app%> test", function () {
    it("adding 2 + 2", function () {
        expect(add(2, 2)).to.equal(4);
    });
});
