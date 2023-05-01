const { sanitizeEntity } = require("strapi-utils");
const fs = require("fs");
const path = require("path");

module.exports = {
  async register(data) {
    const { user, jwt } = await strapi.plugins[
      "users-permissions"
    ].services.user.register(data);

    // Send registration email after user registration
    const emailTemplatePath = path.join(
      __dirname,
      "../../../../email-templates/registration-email.html"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");
    const message = {
      to: data.email,
      subject: "Welcome to FormationHub",
      html: emailTemplate,
    };

    await strapi.plugins.email.services.email.send(message);

    return {
      jwt,
      user: sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
      }),
    };
  },
};
