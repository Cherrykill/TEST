// ANCHOR: THEM CAC DEPENDENCIES CAN THIET
const express = require("express");
const app = express();
const port = 3000;

// ANCHOR: DINH NGHIA DUONG DAN
// Route gốc: http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Chao mung den vs web E-commerce");
});
// Route /products: http://localhost:3000/products
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Áo thun nam Basic", price: 199000 },
    { id: 2, name: "Áo sơ mi trắng", price: 349000 },
    { id: 3, name: "Quần jean xanh Slim Fit", price: 499000 },
    { id: 4, name: "Quần jean xanh Slim Fit", price: 499000 },
    { id: 5, name: "Quần jean xanh Slim Fit", price: 499000 },
    {
      id: 4,
      name: "Quần kaki đen",
      price: 429000,
    },
    {
      id: 5,
      name: "Áo hoodie Unisex",
      price: 599000,
    },
  ]);
});
// Route /about: http://localhost:3000/about
app.get("/about", (req, res) => {
  res.send("Day la trang web ban hang cua toi");
});

// ANCHOR: KHOI DONG SERVER
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
  console.log(`📦 Danh sách sản phẩm: http://localhost:${port}/products`);
  console.log(`📦 Thong tin trang web: http://localhost:${port}/about`);
});
