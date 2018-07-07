const {gql} = require('@timhudson/atlas')

module.exports.typeDef = gql`
  type Query {
    posts: [Post]!
  }
`

module.exports.resolvers = {
  Query: {
    posts: async (_, params, ctx) => ctx.getPosts()
  }
}
