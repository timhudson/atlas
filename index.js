const {existsSync} = require('fs')
const globby = require('globby')
const {GraphQLServer} = require('graphql-yoga')
const parser = require('./lib/parser')

const loadModule = path => (existsSync(path) ? require(path) : undefined)

class Server {
  constructor({dir}) {
    this.dir = dir
    this.context = loadModule(`${this.dir}/_context.js`)
    this.scalars = loadModule(`${this.dir}/_scalars.js`)
  }

  async getSchema() {
    return globby(`${this.dir}/!(_*).js`).then(paths => {
      return parser(paths, this.scalars)
    })
  }

  async start(port) {
    const {typeDefs, resolvers} = await this.getSchema()
    this.server = new GraphQLServer({
      typeDefs,
      resolvers,
      context: this.context
    })
    return this.server.start({port})
  }
}

module.exports = options => {
  return new Server(options)
}
