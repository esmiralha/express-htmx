"use strict";

/**
 * An Express-compatible middleware that populates the request object with htmx-specific
 * details to be used by your views for partial rendering and so on.
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
function middleware(req, res, next) {
    const _isHtmx = req.get("HX-Request") === "true";
    const _boosted = req.get("HX-Boosted") === "true";
    const _currentUrl = req.get("HX-Current-URL") || "";
    const _historyRestoreRequest = req.get("HX-History-Restore-Request") || "";
    const _prompt = req.get("HX-Prompt") || "";
    const _target = req.get("HX-Target") || "";
    const _trigger = req.get("HX-Trigger") || "";
    const _triggerName = req.get("HX-Trigger-Name") || "";
    const _triggeringEvent = req.get("Triggering-Event") || "";
    req.htmx = {
        isHtmx: _isHtmx,
        boosted: _boosted,
        currentUrl: _currentUrl,
        historyRestoreRequest: _historyRestoreRequest,
        prompt: _prompt,
        target: _target,
        trigger: _trigger,
        triggerName: _triggerName,
        triggeringEvent: _triggeringEvent,
    };
    next();
}

/**
 * htmx can trigger a client side redirect when it receives a response with the HX-Redirect header.
 * @param {object} res An Express HTTP response object.
 * @param {string} redirectTo The URL to redirect to.
 */
function clientRedirect(res, redirectTo) {
    return res.set({
        "HX-Redirect": redirectTo,
    });
}

/**
 * @param {object} res An Express HTTP response object.
 */
function clientRefresh(res) {
    return res.set({
        "HX-Refresh": "true",
    });
}

/**
 * @public
 * @param {object} res An Express HTTP response object.
 * @param {string} path
 * @param {object=} context
 */
function location(res, path, context) {
    if (!context) {
        return res.set({
            "HX-Location": path,
        });
    } else {
        context.path = path;
        return res.set({
            "HX-Location": JSON.stringify(context),
        });
    }
}

/**
 * @param {object} res An Express HTTP response object.
 */
function stopPolling(res) {
    return res.status(286);
}

const htmx = {
    middleware,
    http: {
        clientRedirect,
        clientRefresh,
        location,
        stopPolling,
    },
};

module.exports = htmx;
