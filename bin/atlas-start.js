#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const pkgConf = require('pkg-conf')
const atlas = require('..')

const conf = pkgConf.sync('atlas')
const filepath = pkgConf.filepath(conf)

const dir = path.resolve(path.dirname(filepath), 'schema')
const port = conf.port || 3000

const cli = meow(
  `
  Usage
    $ atlas start

  Options
    --port, p Server port [default: ${port}]

  Examples
    $ atlas start
    $ atlas start --port 8000
`,
  {
    flags: {
      port: {
        type: 'number',
        alias: 'p',
        default: port
      }
    }
  }
)

atlas({dir})
  .start(cli.flags.port)
  .then(async () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
  .catch(err => {
    console.error(err)
    process.nextTick(() => process.exit(1))
  })
