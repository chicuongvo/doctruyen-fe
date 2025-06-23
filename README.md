# 📚 DocTruyen - Nền tảng Đọc Truyện Online

DocTruyen là một ứng dụng web hiện đại cho phép người dùng đọc truyện online với giao diện thân thiện và tính năng phong phú. Dự án được xây dựng bằng React, TypeScript và Vite với các công nghệ web tiên tiến.

## ✨ Tính năng chính

### 👤 Người dùng

- **Đăng ký/Đăng nhập**: Hệ thống xác thực an toàn với email verification
- **Quên mật khẩu**: Khôi phục mật khẩu qua email
- **Quản lý hồ sơ**: Cập nhật thông tin cá nhân
- **Yêu thích truyện**: Lưu danh sách truyện yêu thích
- **Lịch sử đọc**: Theo dõi tiến độ đọc truyện

### 📖 Đọc truyện

- **Thư viện truyện**: Duyệt qua hàng ngàn đầu truyện
- **Phân loại thể loại**: Tìm truyện theo thể loại yêu thích
- **Tìm kiếm nâng cao**: Tìm kiếm theo tên, tác giả, thể loại
- **Đọc online**: Giao diện đọc tối ưu trên mọi thiết bị
- **Chế độ tối/sáng**: Bảo vệ mắt khi đọc

### 📝 Blog & Tin tức

- **Tin tức mới nhất**: Cập nhật thông tin về truyện mới
- **Bài viết chuyên sâu**: Review, phân tích truyện
- **Chia sẻ cộng đồng**: Tương tác với độc giả khác

### 🤖 AI Chatbot

- **Tư vấn truyện**: Gợi ý truyện phù hợp với sở thích
- **Hỗ trợ 24/7**: Giải đáp thắc mắc mọi lúc
- **Tìm kiếm thông minh**: Tìm truyện bằng mô tả nội dung

### 🛠 Quản trị viên

- **Quản lý người dùng**: Xem, chỉnh sửa, ban/unban người dùng
- **Quản lý truyện**: CRUD truyện và chương
- **Quản lý blog**: Tạo và chỉnh sửa bài viết
- **Dashboard**: Thống kê và báo cáo hệ thống

## 🚀 Công nghệ sử dụng

### Frontend Core

- **React 18**: Thư viện UI hiện đại
- **TypeScript**: Type safety và IntelliSense
- **Vite**: Build tool nhanh chóng
- **React Router**: Điều hướng SPA

### Styling & UI

- **Tailwind CSS v4**: Framework CSS utility-first
- **DaisyUI**: Component library
- **Shadcn/ui**: High-quality components
- **Lucide Icons**: Icon library

### State Management

- **TanStack Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Development Tools

- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

### Additional Features

- **React Toastify**: Toast notifications
- **Date-fns**: Date manipulation
- **Axios**: HTTP client

## 📁 Cấu trúc dự án

```
src/
├── api/                    # API calls và services
├── components/             # Shared components
│   ├── ui/                # Shadcn/ui components
│   └── layout/            # Layout components
├── pages/                 # Page components
│   ├── admin/            # Admin pages
│   ├── auth/             # Authentication pages
│   └── public/           # Public pages
├── hooks/                # Custom React hooks
├── lib/                  # Utilities và helpers
├── types/                # TypeScript type definitions
└── assets/               # Static assets
```

## 🛠 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm >= 9.0.0 hoặc yarn >= 1.22.0

### Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Chạy development server

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build production

```bash
npm run build
# hoặc
yarn build
```

### Preview production build

```bash
npm run preview
# hoặc
yarn preview
```

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint
- `npm run lint:fix` - Fix ESLint errors tự động

## 🌐 Environment Variables

Tạo file `.env.local` trong thư mục root:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_TITLE=DocTruyen
```

## 🎨 Theme và Styling

Ứng dụng hỗ trợ dark/light mode với Tailwind CSS v4:

- Custom variants cho dark mode
- DaisyUI themes
- Responsive design
- Accessible components

## 📱 Responsive Design

- **Mobile First**: Thiết kế ưu tiên mobile
- **Tablet**: Tối ưu cho màn hình trung bình
- **Desktop**: Trải nghiệm đầy đủ trên PC

## 🔐 Authentication Flow

1. **Đăng ký**: Email → Verification → Activate account
2. **Đăng nhập**: Email/Password → JWT token
3. **Quên mật khẩu**: Email → Reset token → New password
4. **Bảo mật**: Protected routes, role-based access

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 👥 Team

### Frontend Developer

- **Họ tên**: Nguyễn Cao Quang - **MSSV**: 23521284

### Full-stack Developer

- **Họ tên**: Nguyễn Thị Khánh Ngọc - **MSSV**: 23521032
- **Họ tên**: Ung Quang Trí - **MSSV**: 23521649
- **Họ tên**: Võ Chí Cường - **MSSV**: 23520210
- **Họ tên**: Nguyễn Công Đức - **MSSV**: 23520307

## 📞 Liên hệ

- **Website**: [doctruyenvui.id.vn](doctruyenvui.id.vn)

---

⭐ Nếu dự án hữu ích, hãy cho chúng tôi một star trên GitHub!
