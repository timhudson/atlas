const {existsSync} = require('fs')
const globby = require('globby')
const {GraphQLServer} = require('graphql-yoga')
const pify = require('pify')
const parser = require('./lib/parser')

const loadModule = path => (existsSync(path) ? require(path) : undefined)

class Server {
  constructor({dir, clearCache = false}) {
    this.dir = dir
    this.clearCache = clearCache
    this.context = loadModule(`${this.dir}/_context.js`)
  }

  async getSchema() {
    return globby(`${this.dir}/!(_*).js`).then(paths => {
      if (this.clearCache) {
        for (const path of paths) {
          delete require.cache[path]
        }
      }
      return parser(paths)
    })
  }

  async start(port) {
    const {typeDefs, resolvers} = await this.getSchema()
    this.server = new GraphQLServer({
      typeDefs,
      resolvers,
      context: this.context
    })
    this.httpServer = await this.server.start({port})

    return this.httpServer
  }

  async close() {
    const {httpServer} = this
    return pify(httpServer.close.bind(httpServer))()
  }
}

module.exports = options => {
  return new Server(options)
}
