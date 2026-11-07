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
  trustedOrigins: [
    "https://kanbanspace.site",
    "https://www.kanbanspace.site",
    "https://kdev-project-workspace.vercel.app",
  ],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      requireEmailVerification: true,
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
