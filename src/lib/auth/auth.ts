import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { db } from "@/db/client";
import { ac, roles } from "./permissions";
import { env } from "@/lib/env";
import * as schema from "../../db/schema/auth-schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      ac,
      roles,
      async sendInvitationEmail(data) {
        const inviteLink = `${env.BETTER_AUTH_URL}/invite/${data.id}`;
        // Bước 6: gửi bằng Resend
        console.log("Invite link:", inviteLink, "->", data.email);
      },
    }),
    nextCookies(),
  ],
});
