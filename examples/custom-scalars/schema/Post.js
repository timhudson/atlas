const { gql } = require('@timhudson/atlas')

module.exports.typeDef = gql`
  type Post {
    id: String!
    title: String!
    metadata: JSON!
  }
`
