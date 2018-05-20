module.exports.typeDef = `
  type Query {
    me: User!
  }
`

module.exports.resolvers = {
  Query: {
    me: async (user, params, ctx) => ctx.getUser()
  }
}
