// ANCHOR: 1. VARIABLES
const products = [
  {
    id: 1,
    name: "Áo thun nam Basic",
    price: 199000,
    image: "ao-thun-nam-basic.png",
    description: "Chất liệu cotton 100%, thoáng mát, thích hợp mặc hàng ngày.",
  },
  {
    id: 2,
    name: "Áo sơ mi trắng",
    price: 349000,
    image: "ao-som-mi-trang.png",
    description: "Sơ mi công sở, form ôm, dễ phối đồ.",
  },
  {
    id: 3,
    name: "Quần jean xanh Slim Fit",
    price: 499000,
    image: "quan-jeans-slim-fit.png",
    description: "Quần jean xanh ôm chân, phong cách trẻ trung.",
  },
  {
    id: 4,
    name: "Quần kaki đen",
    price: 429000,
    image: "quan-kaki-den.png",
    description: "Quần kaki đen, chất vải dày dặn, mặc đi làm.",
  },
  {
    id: 5,
    name: "Áo hoodie Unisex",
    price: 599000,
    image: "ao-hoodie-unisex.png",
    description: "Áo hoodie unisex, thoải mái, phong cách đường phố.",
  },
  {
    id: 6,
    name: "Áo khoác Bomber",
    price: 799000,
    image: "ao-khoac-bomber.png",
    description: "Áo khoác bomber, chất vải dù, giữ ấm tốt.",
  },
  {
    id: 7,
    name: "Váy hoa mùa hè",
    price: 459000,
    image: "vay-hoa-mua-he.png",
    description: "Váy hoa nhẹ nhàng, thoáng mát cho mùa hè.",
  },
  {
    id: 8,
    name: "Chân váy xếp ly",
    price: 329000,
    image: "chan-va-xep-ly.png",
    description: "Chân váy xếp ly, phong cách nữ tính, thanh lịch.",
  },
  {
    id: 9,
    name: "Áo polo nam",
    price: 289000,
    image: "ao-polo-nam.png",
    description: "Áo polo nam, chất liệu thấm hút mồ hôi tốt.",
  },
  {
    id: 10,
    name: "Áo len cổ lọ",
    price: 399000,
    image: "ao-len-co-lo.png",
    description: "Áo len cổ lọ, giữ ấm mùa đông, phong cách lịch lãm.",
  },
  {
    id: 11,
    name: "Áo thun tay dài",
    price: 259000,
    image: "ao-thu-tay-dai.png",
    description: "Áo thun tay dài, giữ ấm mùa đông, phong cách lịch lãm.",
  },
];
const carts = [];

// ANCHOR: 2. HAM TAI GIO HANG TU LOCALSTORAGE
function loadCartFromStorage() {
  const storedCart = localStorage.getItem("shoppingCart");
  if (storedCart) {
    cart = JSON.parse(storedCart); // Chuyen chuoi JSON thanh mang
  } else {
    cart = []; // Reset mang hoan toan dam bao mang rong
  }
  updateCartCount(); // Cap nhap hien thi
}

// ANCHOR: 3. HAM LUU GIO HANG VAO LOCALSTORAGE
function saveCartToStorage() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart)); // Chuyen mang thanh chuoi JSON
}

// ANCHOR: 4. HAM THEM SAN PHAM VAO GIO HANG
function addToCart(productName, price) {
  // Tao doi tuong san pham
  const product = {
    name: productName,
    price: price,
    quantity: 1,
  };

  // Kiem tra xem san pham da co trong gio chua
  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    // Neu co roi thi tang so luong
    existingProduct.quantity += 1;
    console.log(existingProduct);
  } else {
    // Neu chua co gi thi them moi
    cart.push(product);
  }

  // Lưu vào LocalStorage
  saveCartToStorage();

  // Cap nhap hien thi
  updateCartCount();

  // Thong bao nguoi dung
  showToast(`🛒 Đã thêm '${productName}' vào giỏ hàng`);
}

// ANCHOR: 5. HAM CAP NHAP SO LUONG HIEN THI TREN HEADER
function updateCartCount() {
  // Tinh tong so san pham (cong don quantity)
  let totalItem = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItem += cart[i].quantity;
  }

  // Tim the <a> trong "gio hang" va them badge
  const cartLink = document.querySelector(".cart-link");
  if (cartLink) {
    // Neu da co badge roi thi cap nhap, chua co thi tao moi
    let badge = cartLink.querySelector(".cart-badge");
    if (!badge) {
      badge = document.createElement("span"); // TTao phan tu span
      badge.className = "cart-badge"; // Gan class cho phan tu span
      cartLink.appendChild(badge); // Nhet phan tu span vao cartLink
    }
    badge.textContent = totalItem > 0 ? totalItem : ""; // Neu gio hang <= 0 se k hien thi gi ca
  }
}

// ANCHOR: 6. HAM XOA TOAN BO GIO HANG (DUNG SAU THANH TOAN)
function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartCount();
  displayCart();
  alert("Da xoa toan bo gio hang");
}

// ANCHOR: 7. HAM HIEN THI GIO HANG TREN TRANG cart.html
function displayCart() {
  const cartTable = document.querySelector(".cart-table tbody");
  if (!cartTable) return;

  // Xoa tat ca noi dung cu
  cartTable.innerHTML = "";

  // Neu gio hang rong
  if (cart.length === 0) {
    cartTable.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center; padding: 30px; color:#999">Gio hang cua ban dang trong</td>
    </tr>
    `;

    // Cap nhap tong tien ve 0
    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
      const td = totalElement.querySelector("td:last-child"); // Tim cai the <td> o cuoi cung khong co noi dung gi
      if (td) td.textContent = "0đ";
    }
    return;
  }

  // Hien thi tung san pham
  let totalPrice = 0;
  cart.forEach((item, index) => {
    const row = document.createElement("tr"); // Tao the <tr> chua html
    const subtotal = item.price * item.quantity;
    totalPrice += subtotal;

    row.innerHTML = `
       <td>${item.name}</td>
            <td>
              <input type="number" value="${item.quantity}" min="1" style="width: 60px" />
            </td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>${subtotal.toLocaleString()}đ</td>
            <td>
              <button class="btn-danger" onclick="removeItem(${index})">Xóa</button>
            </td>
    `;
    cartTable.appendChild(row); // Them row vao cartTable
  });

  // Cap nhap tong tien
  const totalElement = document.querySelector(".cart-total");
  if (totalElement) {
    const td = totalElement.querySelector("td:last-child");
    if (td) td.textContent = totalPrice.toLocaleString() + "đ";
  }
}

// ANCHOR: 8. HAM XOA 1 SAN PHAM KHOI GIO HANG
function removeItem(index) {
  const productName = cart[index].name;
  cart.splice(index, 1); // Xoa phan tu tai vi tri index
  saveCartToStorage();
  displayCart();
  updateCartCount();
  showToast(`🗑️ Đã xóa '${productName}' khỏi giỏ hàng`);
}

// ANCHOR: 9. HAM HIEN THI SAN PHAM LEN TRANG CHỦ
function renderProducts() {
  const productList = document.querySelector(".product-list");
  if (!productList) return;

  // Xoa noi dung cu
  productList.innerHTML = "";

  // Duyet qua tung san pham va tao html tuong ung
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
    <a href="./pages/product-detail.html?id=${product.id}" style="text-decoration:none;color:inherit">
    <img src="./assets/${product.image}" alt="${product.name}"/></a>
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}đ</p>
        <button
            class="btn-primary"
            onclick="addToCart('${product.name}', ${product.price})"
        >
            Mua ngay
        </button>
    `;
    productList.appendChild(productDiv);
  });
}

// ANCHOR: 10. HAM HIEN THI CHI TIET SAN PHAM
function renderProductDetail() {
  // Lay id tu URL
  const urlParam = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParam.get("id"));

  // Tim san pham trong mang
  const product = products.find((product) => product.id === productId);

  const detailContainer = document.getElementById("productDetail");
  if (!detailContainer) return;

  // Neu khong tim thay san pham
  if (!product) {
    detailContainer.innerHTML = `
      <div>
        <h3>Không tìm tháy sản phẩm</h3>
        <a href="../index.html" class="btn-secondary">Quay lại trang chủ</a>
      </div>
    `;
    return;
  }

  // Hien thi chi tiet san pham
  detailContainer.innerHTML = `
  <img src="../assets/${product.image}" alt="áo thun" />
        <h3>${product.name}</h3>
        <p class="price">${product.price.toLocaleString()}₫</p>
        <p class="description">
          ${product.description}
        </p>

        <div class="actions">
          <a href="../index.html" class="btn-secondary">Quay lại</a>
          <button class="btn-primary" onclick="addToCart('${product.name}', ${product.price})">
            Thêm vào giỏ
          </button>
        </div>
  `;
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

// ANCHOR: TAI LAI GIO HANG KHI TRANG DUOC MO (NOI KHOI TAO APP)
document.addEventListener("DOMContentLoaded", function () {
  loadCartFromStorage(); // Tai gio hang tu LocalStorage
  renderProducts(); // Hien thi danh sach san pham trang chu
  displayCart(); // Hien thi badge tren header
  renderProductDetail(); // Hien thi chi tiet san pham
});
