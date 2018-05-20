module.exports.typeDef = `
  type User {
    id: String!
    name: String!
    posts: [Post!]
  }
`

module.exports.resolvers = {
  User: {
    posts: async (user, params, ctx) => ctx.getPosts(user.id)
  }
}
