// BÀI TẬP 2: TÌM user theo email
const users = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
  { id: 3, name: "Bob", email: "bob@example.com" },
];

// B1: Requirement
// Tìm user theo email.
// Nếu tìm thấy → trả về object user.
// Nếu không tìm thấy → trả về undefined hoặc giá trị phù hợp.

// B2: Input/Output
// "john@example.com" => { id: 1, name: "John", email: "john@example.com" }
// "jack@example.com"=> undefined
// "" => undefined

// Constraints (Có giới hạn nào không)
// user luôn là mảng
// email luôn là string
// email phân biệt chữ hoa/chữ thường
// email là duy nhất 

// B3: Edge Case
// users =[] => undefined 
// email = "" => undefined
// email = null => undefined
// email = undefined => undefined
// email khong ton tai => undefined

// B4: Algorithm
// Duyệt mảng -> Nếu tìm thấy phần tử đầu tiên -> Trả ra kết quả luôn

// Complexity (O(n)? O(1)?)

// B5: Cach cai dat nao phu hop
// for
// find

// B6: Code
function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

// B7: Test
console.log(findUserByEmail("john@example.com"));
// {id: 1, name: 'John', email: 'john@example.com'}
console.log(findUserByEmail("jack@example.com"));
// undefined
console.log(findUserByEmail(null));
// undefined
console.log(findUserByEmail(undefined));
// undefined

// Refactor (nếu cần)