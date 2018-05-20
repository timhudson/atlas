const merge = require('lodash.merge')

module.exports = paths => {
  const typeDefs = []
  const resolvers = {}

  for (const path of paths) {
    const schema = require(path)
    typeDefs.push(schema.typeDef)
    merge(resolvers, schema.resolvers)
  }

  return {typeDefs, resolvers}
}
