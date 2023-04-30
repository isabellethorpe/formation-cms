module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "email-smtp.eu-west-2.amazonaws.com"),
        secure: false,
        port: env.int("SMTP_PORT", 25),
        auth: {
          user: env("SMTP_USERNAME", "AKIA3DABVVU5MOSDFSFP"),
          pass: env(
            "SMTP_PASSWORD",
            "BKinwCP0ebHsBdySVf/eWdm4EgquiJpXBzS/S/XNJ45r"
          ),
        },
        tls: {
          ciphers: "TLSv1.2",
        },
      },
      settings: {
        defaultFrom: "noreply@formationhub.co.uk",
        defaultReplyTo: "info@formationhub.co.uk",
      },
    },
  },
});
