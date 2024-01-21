# Authentication - Xác thực

Kiểm tra user có tồn tại trong database hay không

- Session base
  ==> Sau khi lấy được thông tin user lưu vào session

- Token base
  ==> Sau khi lấy được thông tin user lưu vào token (JWT)

# Đăng nhập thông qua mạng xã hội

- Sử dụng thông tin mạng xã hội để đăng nhập mà k cần password

## Phân tích database

Bảng providers (chứa thông tin các hình thức đăng nhập)

- id
- name
- created_at
- updated_at

Bảng users (chứa thông tin user đăng nhập)
