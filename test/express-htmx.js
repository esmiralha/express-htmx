const { describe, test } = require("mocha");
const { assert } = require("chai");
const htmx = require("../index");

describe("htmx request header", () => {
    test("abssent", () => {
        const htmxMiddleware = htmx.middleware;
        const req = { get: (header) => { return undefined; }};
        const res = {};
        htmxMiddleware(req, res, () => { });
        assert.isFalse(req.htmx.isHtmx);
    });
    test("absent", () => {
        const htmxMiddleware = htmx.middleware;
        const req = {
            get: (header) => {
                const headers = {"HX-Request": "true"};
                return headers[header];
            }
        };
        const res = {};
        htmxMiddleware(req, res, () => { });
        assert.isTrue(req.htmx.isHtmx);
    });
});
