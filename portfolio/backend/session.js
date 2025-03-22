import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const days = 1;
console.log(process.env.SESSION_TOKEN)

const iron_options = {
  cookieName: "trevorgibby.dev",
  password: process.env.SESSION_TOKEN,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  // cookieOptions: {
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: days * 24 * 60 * 60
  // },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, iron_options);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, iron_options);
}