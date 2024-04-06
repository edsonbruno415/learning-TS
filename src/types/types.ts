const email: string = "joajao@gmail.com";
const port: number = 123;

// tipagem no retorno da função
const add = function (a: number, b: number): number {
  return a + b;
}

const result = add(2, 2);
console.log('RESULT', result);

class Person {
  name: string;
  age: number;
  email?: string; // opcional
  address: string | undefined // opcional
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }
}

const person = new Person('João Garcia', 22);
console.log('PERSON', person);

// tipagem de array, array somente de números
const numbers: number[] = [];
numbers[0] = 10;
// numbers[1] = true; // Error
// numbers[2] = "12"; // Error

const persons: Person[] = [];
persons.push(new Person('Barbada Liskov', 47));
persons.push({
  name: "Uncle Bob", age: 53, email: undefined, address: undefined,
  getName() {
    return this.name;
  },
});
// persons.push("Uncle Bob Martin"); // Error

console.log('PERSONS', persons.map(person => person.getName()));

// type alias

type fullName = string;
type fullAddress = string;
type numberAddress = number;

type PersonType = { name: fullName, address: fullAddress, numberAddress: numberAddress };

let PersonName: fullName = 'Eduardo Costa Araujo';
// PersonName = 10; // error
PersonName = 'Eduardo Costa Araujo Vascaino'

type age = number | string | boolean;
let myAge: age = 26;
myAge = '26';
myAge = true;

// Union Types

type Entity = {
  id: number,
};

type City = {
  city: string,
};

type Enterprise = {
  name: string,
  business: 'Tecnologia' | 'Varejo' | 'Mobiliario'
}

type Company = City & Entity & Enterprise;

const companies: Company[] = [];
companies.push({ id: 123, city: 'São Paulo', name: 'Americanas', business: 'Varejo' });
// companies.push({ id: 123, city: 'São Paulo', name: 'Agro Mil', business: 'Agronomo'}); //Error because dont exists business Agronomo


// ANY AND UNKNOWN
// Type unknown(desconhecido) só pode ser usado por outros objetos/classes/variaveis que são desconhecidas tbm ou any, ou seja, bem restrito
// Type Any(Qualquer coisa) é utilizado para qualquer coisa, como se desativasse a tipagem e só utilizasse javascript

class Server {
  constructor(readonly port: any){} // definir como number pode dar erro pq unknown só recebe unknown ou any
}

function init(port: unknown){
  new Server(port);
}

init(8080);

// VOID AND NEVER
// NEVER -> NUNCA TEM RETORNO COMO POR EXEMPLO UM LOOP INFINITO DE WHILE(TRUE)
// VOID -> RETORNO VAZIO

function initNever(): never{
  initNever();
}

function initVoid(): void{
  return undefined;
}
