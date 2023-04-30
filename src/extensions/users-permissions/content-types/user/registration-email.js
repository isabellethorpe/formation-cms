const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

module.exports = {
  lifecycles: {
    async afterCreate(result, data) {
      await sendRegistrationEmail(result.email);
    },
  },
};

async function sendRegistrationEmail(email) {
  const { defaultFrom, defaultReplyTo } = strapi.plugins.email.config.settings;
  const { host, port, secure, auth, tls } =
    strapi.plugins.email.config.config.providerOptions;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth,
    tls,
  });

  const templatePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "email-templates",
    "registration-email.html"
  );
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");

  const mailOptions = {
    from: defaultFrom,
    to: email,
    subject: "Welcome to FormationHub",
    html: emailTemplate,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending registration email:", error);
    } else {
      console.log("Registration email sent:", info.messageId);
    }
  });
}
