# Shopify React App

Ứng dụng thương mại điện tử được xây dựng với React, React Router, Tailwind CSS và SCSS.

## Tính năng

- 🏠 **Trang chủ**: Hiển thị danh sách sản phẩm với bộ lọc và tìm kiếm
- 🛍️ **Chi tiết sản phẩm**: Trang chi tiết với hình ảnh, thông tin và tùy chọn mua hàng
- 🧭 **Navigation**: Menu điều hướng responsive với tìm kiếm
- 📱 **Responsive**: Thiết kế tương thích với mọi thiết bị
- 🎨 **UI/UX**: Giao diện hiện đại với Tailwind CSS và SCSS
- 🔍 **Tìm kiếm**: Tìm kiếm sản phẩm theo tên và mô tả
- 🏷️ **Phân loại**: Lọc sản phẩm theo danh mục
- ⭐ **Đánh giá**: Hiển thị đánh giá và số sao
- 💰 **Giá cả**: Hiển thị giá gốc và giá khuyến mãi

## Cấu trúc thư mục

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.jsx      # Header với menu và tìm kiếm
│   ├── Footer.jsx      # Footer với thông tin liên hệ
│   └── ProductCard.jsx # Card hiển thị sản phẩm
├── pages/              # Các trang chính
│   ├── Home.jsx       # Trang chủ
│   ├── ProductDetail.jsx # Chi tiết sản phẩm
│   ├── About.jsx      # Giới thiệu
│   └── Contact.jsx    # Liên hệ
├── layouts/            # Layout components
│   └── MainLayout.jsx # Layout chính với Header và Footer
├── data/              # Dữ liệu mẫu
│   └── products.js    # Danh sách sản phẩm và danh mục
├── styles/            # File SCSS
│   ├── variables.scss # Biến SCSS
│   ├── components/    # Styles cho components
│   ├── pages/         # Styles cho pages
│   └── layouts/       # Styles cho layouts
├── utils/             # Utility functions
└── hooks/             # Custom React hooks
```

## Cài đặt và chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

3. **Build cho production:**
   ```bash
   npm run build
   ```

## Công nghệ sử dụng

- **React 19**: Framework JavaScript
- **React Router**: Điều hướng trang
- **Tailwind CSS**: Framework CSS utility-first
- **SCSS**: Preprocessor CSS
- **Vite**: Build tool và dev server

## Tính năng chính

### Trang chủ
- Hero section với tìm kiếm
- Danh mục sản phẩm
- Grid sản phẩm với filter và sort
- Newsletter subscription

### Chi tiết sản phẩm
- Gallery hình ảnh
- Thông tin chi tiết sản phẩm
- Tùy chọn kích thước, màu sắc
- Chọn số lượng
- Nút thêm vào giỏ và mua ngay

### Header
- Logo và menu navigation
- Thanh tìm kiếm
- Icon giỏ hàng và user
- Menu mobile responsive

### Footer
- Thông tin công ty
- Links hữu ích
- Thông tin liên hệ
- Social media links

## Customization

### Thay đổi màu sắc
Chỉnh sửa file `src/styles/variables.scss`:

```scss
$primary-color: #3b82f6;    // Màu chính
$secondary-color: #6b7280;  // Màu phụ
$success-color: #10b981;     // Màu thành công
$danger-color: #ef4444;      // Màu cảnh báo
```

### Thêm sản phẩm mới
Chỉnh sửa file `src/data/products.js`:

```javascript
export const products = [
  {
    id: 7,
    name: "Tên sản phẩm",
    price: 299,
    originalPrice: 399,
    image: "url-hình-ảnh",
    description: "Mô tả sản phẩm",
    category: "Danh mục",
    rating: 4.5,
    reviews: 100,
    inStock: true,
    features: ["Tính năng 1", "Tính năng 2"]
  }
];
```

## Responsive Design

Ứng dụng được thiết kế responsive với các breakpoint:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License