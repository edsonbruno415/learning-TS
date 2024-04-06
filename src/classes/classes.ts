// Metodos abstratos só podem conter em classes abstratas
// Quem estende a classe abstrata é pode implementar parcialmente seus metodos e atributos
// Diferente de uma interface, onde quem implementa é obrigatório implementar seus metodos e atributos

// classe abstrata é implementação parcial
abstract class Item {
  description: string;
  price: number;

  constructor(description: string, price: number) {
    this.description = description;
    this.price = price;
  }

  calculateTax() {
    return this.price * this.getTax();
  }

  abstract getTax(): number;
}

class RealItem extends Item {
  getTax(): number {
    return 0.1;
  }
}

const item = new RealItem('Book', 120);
console.log('Book Tax', item.calculateTax());

// interface é obrigatorio implementação completa

interface Iitem {
  description: string;
  price: number;
  calculateTax(): number;
}

class newItem implements Iitem {
  description: string;
  price: number;

  constructor(description: string, price: number) {
    this.description = description;
    this.price = price;
  }

  calculateTax(): number {
    return this.price * 0.1;
  }
}

const itemInterface = new newItem("Book", 100);
console.log('TAX INTERFACE:', itemInterface.calculateTax());

// Classes só podem estender somente uma classe
// Porém Classes podem implementar multiplas interfaces

class BaseClass {
  constructor(readonly category: 'Terror' | 'Romance' | 'Filmes' | 'Anime' ){}
}

interface IitemId {
  id: number;
}

class CreateItem extends BaseClass implements Iitem, IitemId {
  description: string;
  price: number;
  id: number;

  constructor(id: number, description: string, price: number) {
    super('Terror'); // chama o construtor da superclasse ou classe pai
    this.description = description;
    this.price = price;
    this.id = id;
  }

  calculateTax(): number {
    return this.price * 0.2;
  }
}

const createItem = new CreateItem(123, "Book", 350);
console.log('TAX Multiplas interfaces:', createItem.calculateTax());

// Protected -> é o atributo que só pode ser acessado pelas seus subclasses ou classes filhas
// Private -> o atributo não pode ser acessado por ninguém de fora, a não ser pela própria classe 

class BaseCar{
  private wheels;
  #doors; // private js
  protected model;
  constructor(
    wheels: number, 
    doors: number,
    model: string,
  ){
    this.wheels = wheels;
    this.#doors = doors;
    this.model = model;
  }
}

class Car extends BaseCar{
  constructor(readonly brand: string, readonly price: number){
    super(4, 2, 'Fusca');
    this.brand = brand;
    this.price = price;
  }

  getModel(){
    return this.model;
  }
}

const car = new Car('Volkswagen', 8000);
console.log('MODEL CAR:', car.getModel());
