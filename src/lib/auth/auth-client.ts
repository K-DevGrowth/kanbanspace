import { organization } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, roles } from "./permissions";

export const authClient = createAuthClient({
  plugins: [organization({ ac, roles })],
});
