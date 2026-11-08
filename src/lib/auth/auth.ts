import { Resend } from "resend";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { emailOTP, organization } from "better-auth/plugins";
import { db } from "@/db/client";
import { ac, roles } from "./permissions";
import { env } from "@/lib/env";
import * as schema from "../../db/schema/auth-schema";

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
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
    },
  },
  rateLimit: {
    storage: "database",
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
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        void resend.emails.send({
          from: "KanbanSpace <noreply@kanbanspace.site>",
          to: email,
          subject: type === "sign-in" ? "Mã xác thực OTP KanbanSpace" : "",
          html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p>`,
        });
      },
    }),
  ],
});
