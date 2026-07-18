// ANCHOR: VARIABLES
const API_BASE_URL = "http://localhost:3000";

// ANCHOR: --- CART ---
// ANCHOR: ADD TO CART
async function addToCart(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity: 1 }),
    });

    if (!response.ok) throw new Error("Không thể thêm vào giỏ hàng");

    const data = await response.json();

    // Cập nhật badge
    await updateCartCount();

    // Hiển thị thông báo
    showToast(`🛒 Đã thêm sản phẩm vào giỏ hàng!`);

    // Nếu đang ở trang giỏ hàng, cập nhật lại bảng
    if (document.querySelector(".cart-table")) {
      displayCart();
    }
  } catch (error) {
    console.error("Lỗi thêm vào giỏ:", error);
    showToast(`❌ ${error.message}`, true);
  }
}

// ANCHOR: UPDATE QUANTITY
async function updateQuantity(cartId, newQuantity) {
  if (newQuantity < 1) return;

  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: parseInt(newQuantity) }),
    });

    if (!response.ok) throw new Error("Không thể cập nhật số lượng");

    await displayCart(); // Cập nhật lại bảng
    await updateCartCount(); // Cập nhật badge
  } catch (error) {
    console.error("Lỗi cập nhật số lượng:", error);
    showToast(`❌ ${error.message}`, true);
  }
}

// ANCHOR: UPDATE CART COUNT (BADGE)
async function updateCartCount() {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error("Không thể lấy giỏ hàng");

    const cartItems = await response.json();

    // Tính tổng số sản phẩm
    let totalItems = 0;
    cartItems.forEach((item) => {
      totalItems += item.quantity;
    });

    // Cập nhật badge
    const cartLink = document.querySelector('nav a[href="cart.html"]');
    if (cartLink) {
      let badge = cartLink.querySelector(".cart-badge");
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cart-badge";
        cartLink.appendChild(badge);
      }
      badge.textContent = totalItems > 0 ? totalItems : "";
    }
  } catch (error) {
    console.error("Lỗi cập nhật badge:", error);
  }
}

// ANCHOR: REMOVE ITEM
async function removeItem(cartId) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Không thể xóa sản phẩm");

    await displayCart();
    await updateCartCount();
    showToast("🗑️ Đã xóa sản phẩm khỏi giỏ hàng");
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    showToast(`❌ ${error.message}`, true);
  }
}

// ANCHOR: CLEAR CART
async function clearCart() {
  if (!confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Không thể xóa giỏ hàng");

    await displayCart();
    await updateCartCount();
    showToast("🧹 Đã xóa toàn bộ giỏ hàng");
  } catch (error) {
    console.error("Lỗi xóa giỏ hàng:", error);
    showToast(`❌ ${error.message}`, true);
  }
}

// ANCHOR: DISPLAY CART
async function displayCart() {
  const cartTable = document.querySelector(".cart-table tbody");
  if (!cartTable) return;

  try {
    // Gọi API lấy giỏ hàng
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error("Không thể lấy giỏ hàng");

    const cartItems = await response.json();

    // Xóa nội dung cũ
    cartTable.innerHTML = "";

    // Nếu giỏ hàng rỗng
    if (cartItems.length === 0) {
      cartTable.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center; padding:30px; color:#999;">
            🛒 Giỏ hàng của bạn đang trống
          </td>
        </tr>
      `;
      updateCartTotal(0);
      return;
    }

    // Hiển thị từng sản phẩm
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const product = item.products;
      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" 
                 onchange="updateQuantity(${item.id}, this.value)" style="width:60px;">
        </td>
        <td>${product.price.toLocaleString()}₫</td>
        <td>${subtotal.toLocaleString()}₫</td>
        <td>
          <button class="btn-danger" onclick="removeItem(${item.id})">Xóa</button>
        </td>
      `;
      cartTable.appendChild(row);
    });

    // Cập nhật tổng tiền
    updateCartTotal(totalPrice);
  } catch (error) {
    console.error("Lỗi hiển thị giỏ hàng:", error);
    cartTable.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:30px; color:red;">
          ❌ Lỗi tải giỏ hàng: ${error.message}
        </td>
      </tr>
    `;
  }
}

// ANCHOR: UPDATE CART TOTAL
function updateCartTotal(total) {
  const totalElement = document.querySelector(".cart-total");
  if (totalElement) {
    const td = totalElement.querySelector("td:last-child");
    if (td) td.textContent = total.toLocaleString() + "₫";
  }
}

// ANCHOR: --- PRODUCT ---
// ANCHOR: RENDER PRODUCTS (TRANG CHU)
async function renderProducts() {
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Không thể lấy danh sách sản phẩm");

    const products = await response.json();

    productList.innerHTML = "";
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <a href="./pages/product-detail.html?id=${product.id}" style="text-decoration:none;color:inherit">
          <img src="./assets/${product.image}" alt="${product.name}" />
        </a>
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()}₫</p>
        <button class="btn-primary" onclick="addToCart(${product.id})">Mua ngay</button>
      `;
      productList.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Lỗi render sản phẩm:", error);
    productList.innerHTML = `<p style="color:red">Lỗi tải sản phẩm: ${error.message}</p>`;
  }
}

// ANCHOR: RENDER PRODUCT DETAIL
async function renderProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const detailContainer = document.getElementById("productDetail");
  if (!detailContainer) return;

  if (!productId) {
    detailContainer.innerHTML = `
      <div style="text-align:center; padding:40px;">
        <h3>❌ Không tìm thấy sản phẩm</h3>
        <a href="../index.html" class="btn-secondary">Quay lại trang chủ</a>
      </div>
    `;
    return;
  }

  try {
    // Gọi API lấy tất cả sản phẩm và tìm theo id
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Không thể lấy dữ liệu sản phẩm");

    const products = await response.json();
    const product = products.find((p) => p.id === parseInt(productId));

    if (!product) {
      detailContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <h3>❌ Không tìm thấy sản phẩm</h3>
          <a href="../index.html" class="btn-secondary">Quay lại trang chủ</a>
        </div>
      `;
      return;
    }

    detailContainer.innerHTML = `
      <img src="../assets/${product.image || "aothun.png"}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price.toLocaleString()}₫</p>
      <p class="description">${product.description || "Chưa có mô tả"}</p>
      <div class="actions">
        <a href="../index.html" class="btn-secondary">Quay lại</a>
        <button class="btn-primary" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
      </div>
    `;
  } catch (error) {
    console.error("Lỗi render chi tiết:", error);
    detailContainer.innerHTML = `
      <div style="text-align:center; padding:40px; color:red;">
        <h3>❌ Lỗi tải sản phẩm: ${error.message}</h3>
        <a href="../index.html" class="btn-secondary">Quay lại trang chủ</a>
      </div>
    `;
  }
}

// ANCHOR: HAM HIEN THI THONG BAO DEP HON
function showToast(message, isError = false) {
  // Xoa toast cu neu co
  const oldToast = document.querySelector(".toast");
  if (oldToast) oldToast.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = `toast ${isError ? "toast-error" : ""}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Tu dong bien mat sau 2.5s
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

// ANCHOR: DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", async function () {
  // Chỉ gọi các hàm phù hợp với trang hiện tại
  if (document.querySelector(".product-list")) {
    await renderProducts();
  }

  if (document.getElementById("productDetail")) {
    await renderProductDetail();
  }

  if (document.querySelector(".cart-table")) {
    await displayCart();
  }

  // Luôn cập nhật badge
  await updateCartCount();
});
