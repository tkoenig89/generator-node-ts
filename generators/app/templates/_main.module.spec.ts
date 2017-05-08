import * as chai from 'chai';
import { add } from "<%= srcFolder %>/main.module";

const expect = chai.expect;

describe("<%=app%>", function () {
    it("adding 2 + 2", function () {
        expect(add(2, 2)).to.equal(4);
    });
});
