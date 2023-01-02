# express-htmx

Extensions for using [htmx](https://htmx.org) with Express.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the  [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
npm i --save express-htmx
```

## How to use

The htmx module contains two sub-modules:

- middleware: an express-compatible middleware that populates the request with an `htmx` object that contains functions to deal with htmx custom headers
- http: a simple API to add htmx custom headers to the response

```js
const express = require("express");
const htmx = require("express-htmx");

const app = express();

app.use(htmx.middleware);

app.get("/", function (req, res) {
  if (req.isHtmx()) {
    // serve partial
  } else {
    // serve full page
  }
});
```
