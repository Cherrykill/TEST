# Quy trinh 7 buoc khi lam mot tinh nang
## B1: Requirement

## B2: Input / Output

## B3: Constraints (có giới hạn nào không)

## B4: Edge Case

## B5: Algorithm

## B7: Complexity (O(n)? O(1)?)

## B8: Code

## B9: Test

## B10: Refactor (nếu cần)


// B11: Trade-off (nếu có nhiều giải pháp)

| Thao tác   | Complexity |
| ---------- | ---------: |
| `for`      |       O(n) |
| `for...of` |       O(n) |
| `while`    |       O(n) |
| `find()`   |       O(n) |
| `filter()` |       O(n) |
| `map()`    |       O(n) |
| `reduce()` |       O(n) |
| `some()`   |       O(n) |
| `every()`  |       O(n) |

Không lặp
↓

O(1)

--------------------

Một vòng lặp
↓

O(n)

--------------------

Hai vòng lặp lồng nhau
↓

O(n²)

--------------------

Ba vòng lặp lồng nhau
↓

O(n³)

Đây là điều Senior sẽ hỏi trước

Senior không hỏi:

"Có tối ưu nhất chưa?"

Senior hỏi:

✅ Code đúng chưa?
✅ Dễ đọc không?
✅ Dễ bảo trì không?
✅ Có cần tối ưu không?

Nếu câu trả lời cuối cùng là không, thì không tối ưu.