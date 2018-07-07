const {existsSync} = require('fs')
const globby = require('globby')
const {ApolloServer, gql} = require('apollo-server')
const pify = require('pify')
const parser = require('./lib/parser')

const loadModule = path => (existsSync(path) ? require(path) : undefined)

class Server {
  constructor({dir, ...options}) {
    this.dir = dir
    this.options = options
    this.context = loadModule(`${this.dir}/_context.js`)
  }

  async getSchema() {
    return globby(`${this.dir}/!(_*).js`).then(paths => parser(paths))
  }

  async start(port) {
    const {typeDefs, resolvers} = await this.getSchema()
    this.server = new ApolloServer({
      ...this.options,
      typeDefs,
      resolvers,
      context: this.context
    })

    await this.server.listen({port})

    return this.server.httpServer
  }

  async close() {
    const {httpServer} = this.server
    return pify(httpServer.close.bind(httpServer))()
  }

  get listening() {
    return this.server.httpServer.listening
  }
}

module.exports = options => {
  return new Server(options)
}

module.exports.gql = gql
