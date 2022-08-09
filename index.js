const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: String
  }

  type Library {
    name: String
    books: [Book]
  }

  type Query {
    libraries: [Library]
    library(name: String): Library
  }
`;


const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
  },
  {
    id: 3,
    title: 'Matéria Escura',
    author: 'Blake Crouch',
  },
]

const libraries = [
  {
    name: "Kuma Library",
    books: books,
  },
  {
    name: "Fe Library",
    books: books,
  },
  {
    name: "Djeni Library",
    books: books,
  }
];


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    libraries: () => libraries,
    library: (parent, args, context, info) => {
      return books.find(item => item.name === args.name);
    }
  },
};


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});