/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    MY_EMAIL: process.env.MY_EMAIL,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_APP_PASSWORD: process.env.SMTP_APP_PASSWORD,

    SESSION_TOKEN: process.env.SESSION_TOKEN,
  },
}

module.exports = nextConfig
