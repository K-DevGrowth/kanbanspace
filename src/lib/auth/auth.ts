import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";
import * as schema from "../../db/schema/auth-schema";
import { organization } from "better-auth/plugins";
import { ac, roles } from "./permissions";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      ac,
      roles,
      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.BETTER_AUTH_URL}/invite/${data.id}`;
        // Bước 6: gửi bằng Resend
        console.log("Invite link:", inviteLink, "->", data.email);
      },
    }),
    nextCookies(),
  ],
});
