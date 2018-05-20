module.exports.typeDef = `
  type Query {
    posts: [Post]!
  }
`

module.exports.resolvers = {
  Query: {
    posts: async (_, params, ctx) => ctx.getPosts()
  }
}
