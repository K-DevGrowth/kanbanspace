# KanbanSpace

Xây dựng nền tảng quản lý dự án và công việc theo mô hình SaaS (Software as a Service) hiện đại, hỗ trợ cộng tác nhóm với bảng Kanban trực quan và quản lý không gian làm việc (workspace) đa tổ chức.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Database & ORM**: PostgreSQL, [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) (Google OAuth, Email/Password, Email OTP)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/), Base UI, [Lucide React](https://lucide.dev/)
- **Email Service**: [Resend](https://resend.com/)

---

## 🛠️ Cài đặt & Khởi chạy (Getting Started)

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc với các thông tin sau:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Resend
RESEND_API_KEY="re_your_resend_api_key"
```

### 3. Đồng bộ Database

```bash
npm run db:generate   # Tạo migration từ schema
npm run db:migrate    # Cập nhật schema lên database
```

### 4. Khởi chạy ứng dụng

```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt để sử dụng.

---

## 📦 Các lệnh thường dùng

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run dev` | Khởi chạy server development (Turbopack) |
| `npm run build` | Build ứng dụng cho môi trường production |
| `npm run start` | Chạy ứng dụng production sau khi build |
| `npm run lint` | Kiểm tra quy chuẩn code bằng ESLint |
| `npm run typecheck` | Kiểm tra kiểu dữ liệu với TypeScript |
| `npm run db:generate` | Sinh file migration Drizzle |
| `npm run db:migrate` | Áp dụng migration vào cơ sở dữ liệu |
