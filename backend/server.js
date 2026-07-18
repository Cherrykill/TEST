// ANCHOR: IMPORT DEPENDIENCIES
import "dotenv/config";
import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

// ANCHOR: DEFINE SERVER
const app = express();
const port = 3000;

// ANCHOR: MIDDLEWARE
app.use(cors()); // Cho phep frontend goi API du co khac cong
app.use(express.json()); // Doc du lieu JSON tu request body

// ANCHOR: CONNECT SUPABASE
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// User ID tam thoi (sau nay se lay tu token)
const TEMP_USER_ID = "demo-user-1";

// ANCHOR: GET HOME PAGE
app.get("/", (req, res) => {
  res.send("Chao mung den vs web E-commerce");
});

// ANCHOR: GET CART
app.get("/cart", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("carts")
      .select(
        `
      id,
      product_id,
      quantity,
      products(id, name, price, image)
      `,
      )
      .eq("user_id", TEMP_USER_ID);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: POST CART
app.post("/cart", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    // Kiem tra san pham da co trong gio chua
    const { data: existing, error: checkError } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", TEMP_USER_ID)
      .eq("product_id", product_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") throw checkError;

    if (existing) {
      // Neu da co -> tang so luong
      const { data, error } = await supabase
        .from("carts")
        .update({ quantity: existing.quantity + (quantity || 1) })
        .eq("id", existing.id)
        .select();

      if (error) throw error;
      res.json(data[0]);
    } else {
      // Neu chua co -> them moi
      const { data, error } = await supabase
        .from("carts")
        .insert({
          user_id: TEMP_USER_ID,
          product_id: product_id,
          quantity: quantity || 1,
        })
        .select();

      if (error) throw error;
      res.json(data[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: PUT ITEM IN CART
app.put("/cart/:id", async (req, res) => {
  console.log("Da nhan dc du lieu");

  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: "So luong phai lon hon 0" });
    }

    const { data, error } = await supabase
      .from("carts")
      .update({ quantity })
      .eq("id", id)
      .eq("user_id", TEMP_USER_ID)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: DELETE CART (phai dat TRUOC /cart/:id)
app.delete("/cart/clear", async (req, res) => {
  try {
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("user_id", TEMP_USER_ID);

    if (error) throw error;
    res.json({ success: true, message: "Da xoa toan bo gio hang" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: DELETE ITEM IN CART
app.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("id", id)
      .eq("user_id", TEMP_USER_ID);

    if (error) throw error;
    res.json({ success: true, message: "Da xoa san pham khoi gio hang" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: GET PRODUCT LIST
app.get("/products", async (req, res) => {
  try {
    // Supabase tra ve { data, error }
    const { data, error } = await supabase.from("products").select("*");

    // Co loi thi nhay xuong catch
    if (error) throw error;
    res.json(data);
  } catch (error) {
    // error.message: noi dung loi
    res.status(500).json({ error: error.message });
  }
});

// ANCHOR: GET ABOUT
app.get("/about", (req, res) => {
  res.send("Day la trang web ban hang cua toi");
});

// ANCHOR: SERVER LISTEN
app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
  console.log(`📦 Danh sách sản phẩm: http://localhost:${port}/products`);
  console.log(`📦 Danh sách giỏ hàng: http://localhost:${port}/cart`);
  console.log(`📦 Thong tin trang web: http://localhost:${port}/about`);
});
