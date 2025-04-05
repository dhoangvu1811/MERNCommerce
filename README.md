# Dự án MERNCommerce

Dự án này là một ứng dụng MERN stack được xây dựng bằng Create React App. Nó cung cấp nhiều tính năng để quản lý sản phẩm, đơn hàng, người dùng và nhiều hơn nữa.

## Tính năng

1. **Trang chủ**: Trang landing chính của ứng dụng.
2. **Quản lý đơn hàng**: Các trang để đặt hàng và xem chi tiết đơn hàng.
3. **Quản lý sản phẩm**: Các trang để liệt kê sản phẩm, xem chi tiết sản phẩm và lọc theo loại sản phẩm.
4. **Xác thực người dùng**: Trang đăng nhập cho người dùng.
5. **Hồ sơ người dùng**: Trang hồ sơ để người dùng quản lý thông tin cá nhân.
6. **Bảng điều khiển quản trị**: Các trang dành riêng cho quản trị viên để quản lý đơn hàng, sản phẩm và người dùng.
7. **Hệ thống thanh toán**: Trang thanh toán và xác nhận đơn hàng thành công.
8. **Xử lý lỗi**: Trang không tìm thấy cho các đường dẫn không hợp lệ.
9. **Thành phần tái sử dụng**: Các thành phần như nút, modal, bảng, biểu đồ để đảm bảo giao diện nhất quán.
10. **Custom Hooks**: Các hooks cho debounce và xử lý mutation.
11. **Tích hợp Redux**: Quản lý trạng thái bằng Redux.
12. **Dịch vụ API**: Các dịch vụ API cho đơn hàng, thanh toán, sản phẩm và người dùng.

## Bắt đầu

### Yêu cầu

- Node.js (v14 hoặc cao hơn)
- npm (v6 hoặc cao hơn)

### Cài đặt

1. Clone repository:
   ```bash
   git clone <repository-url>
   ```
2. Di chuyển vào thư mục dự án:
   ```bash
   cd MERNCommerce
   ```
3. Cài đặt các phụ thuộc:
   ```bash
   npm install
   ```

### Chạy dự án

1. Khởi động server phát triển:
   ```bash
   npm start
   ```
2. Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem ứng dụng.

### Chạy kiểm tra

Khởi động trình kiểm tra ở chế độ xem tương tác:

```bash
npm test
```

### Build cho sản xuất

Build ứng dụng cho môi trường sản xuất:

```bash
npm run build
```

Các file build sẽ được lưu trong thư mục `build/`.

## Tìm hiểu thêm

- [Tài liệu React](https://reactjs.org/)
- [Tài liệu Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
