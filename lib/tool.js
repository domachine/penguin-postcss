'use strict'

const fs = require('fs')
const { dirname, join } = require('path')
const postcss = require('postcss')
const glob = require('glob')
const mkdirp = require('mkdirp')

module.exports = ({ config: { prefix, pattern, plugins, options } }) => {
  const files = glob.sync(join(prefix, pattern))
  return Promise.all(files.map(file => {
    const to = join('static', file)
    return postcss(plugins)
      .process(fs.readFileSync(file), Object.assign({}, options, {
        from: file,
        to
      }))
      .then(({ css, map }) => {
        console.error('penguin-postcss: build style %s', to)
        return new Promise((resolve, reject) =>
          mkdirp(dirname(to), err => err ? reject(err) : resolve())
        )
        .then(() =>
          Promise.all([
            new Promise((resolve, reject) => {
              fs.writeFile(to, css, err => err ? reject(err) : resolve())
            }),
            new Promise((resolve, reject) => {
              if (map) {
                fs.writeFile(to + '.map', css, err =>
                  err ? reject(err) : resolve()
                )
              } else resolve()
            })
          ])
        )
      })
  }))
}
