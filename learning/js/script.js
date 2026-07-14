// ANCHOR: VARIABLES
let cart = [];

// ANCHOR: HAM THEM SAN PHAM VAO GIO HANG
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
    existingProduct += 1;
  } else {
    // Neu chua co gi thi them moi
    cart.push(product);
  }

  // Cap nhap hien thi
  updateCartCount();
  console.log("Giỏ hàng hiện tại:", cart); // Xem trong console để kiểm tra
}

// ANCHOR: HAM CAP NHAP SO LUONG HIEN THI TREN HEADER
function updateCartCount() {
  // Tinh tong so san pham (cong don quantity)
  let totalItem = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItem += cart[i].quantity;
  }

  //   Tim the <a> trong "gio hang" va them badge
  const cartLink = document.querySelector("nav a[href='cart.html']");
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
