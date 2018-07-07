const { gql } = require('@timhudson/atlas')

module.exports.typeDef = gql`
  scalar JSON
`

module.exports.resolvers = {
  JSON: require('graphql-type-json')
}
