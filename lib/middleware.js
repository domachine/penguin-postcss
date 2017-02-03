'use strict'

const fs = require('fs')
const { join } = require('path')
const { Router } = require('express')
const createPostCSS = require('postcss')
const minimatch = require('minimatch')

module.exports = ({ config: { prefix, pattern, plugins, options } }) => {
  const router = new Router()
  const postcss = createPostCSS(plugins)
  router.use(`/static/${prefix}`, (req, res, next) => {
    // Skip non css files
    if (!minimatch(req.path.slice(1), pattern)) return next()
    fs.readFile(join(prefix, req.path), (err, css) => {
      if (err) return next(err)
      postcss
        .process(css, Object.assign({}, options, {
          from: join(prefix, req.path),
          to: join(`static/${prefix}`, req.path)
        }))
        .then(result =>
          res
            .set('Content-Type', 'text/css')
            .send(result.css)
        , next)
    })
  })
  return router
}
