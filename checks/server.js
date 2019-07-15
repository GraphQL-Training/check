const assert = require("assert");

exports.check = async () => {
  const { ApolloServer, gql } = require("apollo-server");

  // This is a (sample) collection of books we'll be able to query
  // the GraphQL server for.  A more complete example might fetch
  // from an existing data source like a REST API or database.
  const books = [
    {
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling"
    },
    {
      title: "Jurassic Park",
      author: "Michael Crichton"
    }
  ];

  // Type definitions define the "shape" of your data and specify
  // which ways the data can be fetched from the GraphQL server.
  const typeDefs = gql`
    # Comments in GraphQL are defined with the hash (#) symbol.

    # This "Book" type can be used in other type declarations.
    type Book {
      title: String
      author: String
    }

    # The "Query" type is the root of all GraphQL queries.
    # (A "Mutation" type will be covered later on.)
    type Query {
      books: [Book]
    }
  `;

  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.
  const resolvers = {
    Query: {
      books: () => books
    }
  };

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  const listenResult = await server.listen();
  const { url } = listenResult;

  const fetch = require("node-fetch");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: `{ books { title author } }`
    })
  });
  if (!response.ok) {
    try {
      console.log(await response.text());
    } catch (e) {
      /* noop */
    }
    throw new Error(
      "Apollo Server didn't execute query successfully; see output above"
    );
  }

  const json = await response.json();

  assert.equal(json.errors, undefined, "Expected no errors");
  assert.equal(json.data.books.length, 2, "Expected 2 books");

  server.httpServer.removeAllListeners();
  await server.stop();

  return "Apollo Server successfully executed";
};
