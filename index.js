#!/usr/bin/env node

const { resolve } = require('path')

const middleware = require('./lib/middleware')
const tool = require('./lib/tool')

module.exports = invoke.bind(null, middleware)

if (require.main === module) {
  invoke(tool, require('subarg')(process.argv.slice(2)))
    .catch(error)
}

function invoke (unit, args) {
  const config = args.c || args.config
  if (!config) return error('no config given (e.g. --config myfile.js)')
  const configObject = require(resolve(process.cwd(), config))
  const {
    prefix = 'styles',
    pattern = '*.*',
    plugins = [],
    options = {}
  } = configObject
  if (!plugins.length) console.warn('penguin-postcss: no plugins given!')
  return unit({ config: { prefix, pattern, plugins, options } })
}

function error (msg) {
  console.error('penguin-postcss: %s', msg.message || msg)
  process.exit(1)
}
