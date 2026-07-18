## API Endpoints

| Method | URL             | Việc làm            | Body               |
|--------|-----------------|---------------------|--------------------|
| GET    | /products       | Lấy danh sách SP    | -                  |
| GET    | /cart           | Lấy giỏ hàng        | -                  |
| POST   | /cart           | Thêm vào giỏ        | product_id, quantity |
| PUT    | /cart/:id       | Đổi số lượng        | quantity           |
| DELETE | /cart/:id       | Xóa 1 món           | -                  |
| DELETE | /cart/clear     | Xóa sạch giỏ        | -                  |
