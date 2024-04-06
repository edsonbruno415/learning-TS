// generics assume o tipo generico definido para aquela classe/propriedade
// é possivel extender o generico com "T extends Classe"

class Repository<T> {
  list: T[];

  constructor() {
    this.list = [];
  }

  add(element: T) {
    this.list.push(element);
  }
}

class BasePerson {
  constructor(
    readonly name: string,
    readonly age: number
  ) { }
}

class BaseBook {
  constructor(readonly title: string) { }
}

const personsArray = new Repository<BasePerson>();
personsArray.add({ name: 'Sandra Bulock', age: 48 });
// personsArray.add({ title: 'Médico e o monstro'}); // Error



