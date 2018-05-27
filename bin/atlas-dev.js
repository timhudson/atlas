#!/usr/bin/env node

const path = require('path')
const meow = require('meow')
const pkgConf = require('pkg-conf')
const chokidar = require('chokidar')
const clearModule = require('clear-module')
const atlas = require('..')

const conf = pkgConf.sync('atlas')
const filepath = pkgConf.filepath(conf)

const dir = path.resolve(path.dirname(filepath), 'schema')
const port = conf.port || 3000

const cli = meow(
  `
  Usage
    $ atlas dev

  Options
    --port, p Server port [default: ${port}]

  Examples
    $ atlas dev
    $ atlas dev --port 8000
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

let server

const refresh = async () => {
  if (server && server.listening) await server.close()
  server = atlas({dir})
  return server.start(cli.flags.port)
}

chokidar
  .watch('*.js', {cwd: dir, ignoreInitial: true})
  .on('all', (event, changedFilepath) => {
    clearModule(path.resolve(dir, changedFilepath))

    refresh()
      .then(() => {
        console.log(`> ${changedFilepath} has been updated`)
      })
      .catch(err => {
        console.log(err)
      })
  })

refresh()
  .then(() => {
    console.log(`> Ready on http://localhost:${port}`)
  })
  .catch(err => {
    console.error(err)
  })
