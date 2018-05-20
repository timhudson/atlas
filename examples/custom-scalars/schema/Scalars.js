module.exports.typeDef = `
  scalar JSON
`

module.exports.resolvers = {
  JSON: require('graphql-type-json')
}
