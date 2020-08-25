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
