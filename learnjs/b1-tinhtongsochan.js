// BÀI TẬP 1: Tính tổng số chẵn trong mảng
// B1: Requirement

// B2: Input/Output
// [1,2,3,4] => 6
// [] => 0

// B3: Edge case
// [] => 0
// [1,3,5] => 0
// [1] => 0
// [2] => 2
// [-2,-4] => -6
// [2,2,2] => 6

// B4: Algorithm
// Duyệt mảng -> Nếu phần tử chẵn -> Cộng vào tổng -> Trả tổng

// B5: Cach cai dat nao phu hop nhat
// for
// for...of
// filter + reduce = 2 lan
// reduce

// B6: Code
const sumEvenNumbers = (arr) => {
  return arr.reduce((sum, n) => {
    if (n % 2 === 0) {
      sum += n;
    }
    return sum;
  }, 0);
};

const findUserByEmail = (email) => {};

// B7: Test
console.log(sumEvenNumbers([1, 2, 3, 4, 5]));
