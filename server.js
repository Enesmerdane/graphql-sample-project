const express = require("express");
const app = express();

const { createHandler } = require("graphql-http/lib/use/express");

const schema = require("./schema");

// The root provides a resolver function for each API endpoint
const rootValue = {
    hello: () => ({ text: "hello there", views: 1231 }),
    createUser: (args, req) => {
        return {
            _id: "124124141",
            name: args.userInput.name,
            email: args.userInput.email,
            password: args.userInput.password,
            status: "active",
            posts: [],
        };
    },
};

// app.use(express.json());

app.use(
    "/graphql",
    createHandler({
        schema,
        rootValue,
    })
);

app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:3000/graphql");
