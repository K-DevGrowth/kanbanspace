import { createAuthClient } from "better-auth/react";
import { ac, roles } from "./permissions";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [organizationClient({ ac, roles })],
});
