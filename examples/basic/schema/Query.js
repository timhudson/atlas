const {gql} = require('@timhudson/atlas')

module.exports.typeDef = gql`
  type Query {
    me: User!
  }
`

module.exports.resolvers = {
  Query: {
    me: async (user, params, ctx) => ctx.getUser()
  }
}
