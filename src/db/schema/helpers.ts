import { timestamp } from "drizzle-orm/pg-core";

/** timestamptz (luôn lưu UTC). Dùng cho mọi cột thời gian của bảng domain mới. */
export const ts = (name: string) => timestamp(name, { withTimezone: true });
