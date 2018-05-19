# @timhudson/atlas

> Atlas is a minimalistic framework for GraphQL servers

### This is a temporary fork of [segmentio/atlas](https://github.com/segmentio/atlas)

# How to use

Install it:

```
npm install @timhudson/atlas graphql
```

and add a script to your `package.json` like this:

``` js
{
  "scripts": {
    "start": "atlas"
  }
}
```

After that, the file-system is the main API.

Populate `./schema/Query.js` inside your project:

``` js
module.exports.typeDef = `
  type Query {
    hello: String!
  }
`

module.exports.Query = {
  hello: async () => 'world'
}
```

and then just run `npm start` and go to `http://localhost:3000`.

Check out the [examples](./examples) for further details.
