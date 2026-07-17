// ANCHOR: THEM CAC DEPENDENCIES CAN THIET
import "dotenv/config";
import express from "express";
import { createClient } from "@supabase/supabase-js";

// ANCHOR: DINH NGHIA SERVER
const app = express();
const port = 3000;

// ANCHOR: KET NOI SUPABASE
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ANCHOR: DINH NGHIA DUONG DAN
// Route gốc: http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Chao mung den vs web E-commerce");
});
// Route /products: http://localhost:3000/products
app.get("/products", async (req, res) => {
  try {
    // Supabase se tra ve mot obj co 2 key la { data: [...], error: null }
    const { data, error } = await supabase.from("products").select("*");

    // Neu obj dc tra ve co key error k phai la null thi truyen luon gtri loi vao thang tham so error o catch(error)
    if (error) throw error;
    res.json(data); // Tra ra data binh thuong neu k co loi
  } catch (error) { // O day "error" giong nhu mot doi tuong co 3 thuoc tinh. VD: error.message la thong diep loi, error.stack la vi tri loi, error.name la ten loi
    res.status(500).json({ error: error.message });
  }
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
