// BÀI TẬP 3: Nhóm users theo độ tuổi
function groupByAge(user) {
  return user.reduce((group, user) => {
    const age = user.age;

    if (!group[age]) {
      group[age] = [];
    }
    group[age].push(user);

    return group;
  }, {});
}

console.log(groupByAge([]));
console.log(groupByAge([{ name: "John", age: 20 }]));
console.log(
  groupByAge([
    { name: "John", age: 20 },
    { name: "Jane", age: 18 },
    { name: "Bob", age: 20 },
  ]),
);
