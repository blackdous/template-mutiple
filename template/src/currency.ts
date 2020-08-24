/*
 * @Descripttion: 
 * @Author: heidous
 * @Date: 2020-08-24 17:13:57
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-24 18:15:04
 */
interface Person {
  name: string;
  age: number;
}
class Animal {
  name: string = 'abc';
}
export const testTypescript = function() {
  const a = { num: 999 };
  console.log(a);
  const p: Person = {
    name: 'abc',
    age: 18
  };
  console.log(p);
  console.log(new Animal().name);
};

export const testJest = function(firstName: string, lastName: string) {
  return 'firstName:' + firstName + 'lastName:' + lastName;
};

// 无法编译的语法
// 无法编译的语法
// 无法编译的语法

// namespace BBB{
//     const name = 'abc';
// }

// const enum Sex {
//     man,
//     woman
// }

// let p2 = {age: 18} as Person;
// console.log(p2.name);
// let p3 = <Person>{age: 18};
// console.log(p3.name);

// export = p3;
