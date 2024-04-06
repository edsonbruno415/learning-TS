import Todo from "./Todo";

const todo = new Todo('Estudar TypeScript');
const todo1 = new Todo('Estudar Clean Architecture');
const todo2 = new Todo('Estudar Clean Code');

console.log('TODO 0:', todo.description);
console.log('TODO 1:', todo1.description);
console.log('TODO 2:', todo2.description);