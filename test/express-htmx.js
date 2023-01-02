const { describe, test } = require("mocha");
const { assert } = require("chai");
const htmx = require("../index");

describe("request headers", () => {
    const headerTests = [
        [
            "htmx-absent", {}, (req) => { return req.htmx.isHtmx; }, false
        ],
        [
            "htmx-present", { "HX-Request": "true" }, (req) => { return req.htmx.isHtmx; }, true
        ],
        [
            "boosted-absent", {}, (req) => { return req.htmx.boosted; }, false
        ],
        [
            "boosted-present", { "HX-Boosted": "true" }, (req) => { return req.htmx.boosted; }, true
        ],
        [
            "currentUrl-absent", {}, (req) => { return req.htmx.currentUrl; }, ""
        ],
        [
            "currentUrl-present", { "HX-Current-URL": "the_url" }, (req) => { return req.htmx.currentUrl; }, "the_url"
        ],
        [
            "prompt-absent", {}, (req) => { return req.htmx.prompt; }, ""
        ],
        [
            "prompt-present", { "HX-Prompt": "the_prompt" }, (req) => { return req.htmx.prompt; }, "the_prompt"
        ],
        [
            "target-absent", {}, (req) => { return req.htmx.target; }, ""
        ],
        [
            "target-present", { "HX-Target": "the_target" }, (req) => { return req.htmx.target; }, "the_target"
        ],
    ];
    headerTests.forEach((ht) => {
        test(`${ht[0]} request header`, () => {
            const htmxMiddleware = htmx.middleware;
            const req = {
                get: (header) => {
                    const headers = ht[1];
                    return headers[header];
                }
            };
            const res = {};
            htmxMiddleware(req, res, () => { });
            assert.equal(ht[2](req), ht[3]);
        });
    });
});