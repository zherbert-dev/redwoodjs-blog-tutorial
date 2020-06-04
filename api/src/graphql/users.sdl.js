export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    Posts: Post
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    name: String
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }
`
