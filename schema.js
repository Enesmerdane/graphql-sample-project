const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type TestData{
    text: String
    views: Int
}

type RootQuery {
    hello: TestData
}

type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    status: String!
    posts: [Post!]!
}

input UserInputData {
    email: String!
    name: String!
    password: String!
}

type RootMutation {
    createUser(userInput: UserInputData): User!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

module.exports = schema;
