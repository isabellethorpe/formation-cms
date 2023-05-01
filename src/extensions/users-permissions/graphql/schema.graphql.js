module.exports = {
  definition: `
      extend type Query {
        checkUser(email: String!): Boolean!
      }
    `,
  resolver: {
    Query: {
      checkUser: {
        resolver: "plugins::users-permissions.user.checkUser",
      },
    },
  },
};
