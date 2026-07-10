// Ham can debounce
const searchAPI = (query) => {
  console.log(`🔍 Đang tìm kiếm: ${query}`);
  // Gọi API ở đây
};

const debounce = (fn, delay) => {
  let timer; // Đồng hồ hẹn giờ

  return (...args) => {
    // Khi bạn gọi hàm này...

    clearTimeout(timer); // Hủy đồng hồ cũ (nếu có)

    timer = setTimeout(() => {
      // Đặt đồng hồ mới
      fn(...args); // Chạy sau delay no se day toan bo gtri cua tham so cho ham searchAPI de log ra man hinh
    }, delay);
  };
};

// Tạo phiên bản Debounce
const debouncedSearch = debounce(searchAPI, 1000); // Closure

// Gọi nhiều lần liên tiếp
debouncedSearch('a');    // ⏳ Chờ 1s
debouncedSearch('ap');   // 🔄 Reset timer, chờ thêm 1s
debouncedSearch('app');  // 🔄 Reset timer, chờ thêm 1s
debouncedSearch('apple');// ✅ Chỉ gọi sau 1s không gọi nữa
// Kết quả: Chỉ in ra "🔍 Đang tìm kiếm: apple" DUY NHẤT 1 LẦN!