// ANCHOR: 1. VARIABLES
let cart = [];

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
    existingProduct += 1;
  } else {
    // Neu chua co gi thi them moi
    cart.push(product);
  }

  // Lưu vào LocalStorage
  saveCartToStorage();

  // Cap nhap hien thi
  updateCartCount();

  // Thong bao nguoi dung
  console.log("Giỏ hàng hiện tại:", cart); // Xem trong console để kiểm tra
}

// ANCHOR: 5. HAM CAP NHAP SO LUONG HIEN THI TREN HEADER
function updateCartCount() {
  // Tinh tong so san pham (cong don quantity)
  let totalItem = 0;
  for (let i = 0; i < cart.length; i++) {
    totalItem += cart[i].quantity;
  }

  // Tim the <a> trong "gio hang" va them badge
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

// ANCHOR: 6. HAM XOA TOAN BO GIO HANG (DUNG SAU THANH TOAN)
function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartCount();
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
       <td>Áo dài tay</td>
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
  const productName = cart[index].name
  cart.splice(index,1) // Xoa phan tu tai vi tri index
  saveCartToStorage()
  displayCart()
  updateCartCount()
  alert(`🗑️ Đã xóa '${productName}' khỏi giỏ hàng`);
}

// ANCHOR: TAI LAI GIO HANG KHI TRANG DUOC MO (NOI KHOI TAO APP)
document.addEventListener('DOMContentLoaded', function(){
  loadCartFromStorage() // Tai tu LocalStorage
  displayCart() // Hien thi badge
})