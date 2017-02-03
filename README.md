# penguin-postcss

This is a toolchain to integrate postcss with [penguin.js](https://github.com/domachine/penguin).

## Installation

    $ npm i -S penguin-postcss

## Usage

This toolchain consists of a middleware for the penguin dev-server and a build tool to build your
styles for production.

The integration of the middleware is easy. Include it in your start command.

    penguin serve --middleware [ penguin-postcss -c postcss.config.js ]

You also have to call the tool as a program to build your styles for production.

    $ penguin-postcss -c postcss-config.js

Both uses include a config.js. This config.js can be named like you prefer and includes some
options:

  * `prefix` - The directory to search for styles. This prefix is also used to serve the styles
    (e.g. /static/{prefix}/mystyle.css).
  * `pattern` - (default `*.*`) The pattern to grep for in the `prefix` directory.
  * `options` - Options to pass directly to `postcss`.
  * `plugins` - Array of plugin instances to use.
