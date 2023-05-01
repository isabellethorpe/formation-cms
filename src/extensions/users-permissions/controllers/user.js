module.exports = {
  async checkUser(ctx) {
    const { email } = ctx.params;
    const user = await strapi.plugins["users-permissions"].services.user.fetch({
      email,
    });
    return !!user;
  },
};
