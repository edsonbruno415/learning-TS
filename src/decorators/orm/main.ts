import pgp, { Column } from "pg-promise";

interface Connection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

class PostgresSQLConnection implements Connection {
  pgp: any;
  constructor() {
    this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
  }
  query(statement: string, params: any): Promise<any> {
    return this.pgp.query(statement, params);
  }
  close(): Promise<void> {
    return this.pgp.$pool.end();
  }

}

class ORM {
  constructor(readonly connection: Connection) {

  }
  async save(entity: Entity) {
    console.log(entity.schema, entity.table, entity.columns);
    const columns = entity.columns.map(column => column.column).join(",");
    const params = entity.columns.map((column, index) => `$${index + 1}`).join(",");
    const values = entity.columns.map(column => entity[column.property]);
    const statement = `insert into ${entity.schema}.${entity.table} (${columns}) values (${params})`;

    this.connection.query(statement, [...values]);
  }

  async list(){
    return this.connection.query("select * from branas.book",[]);
  }
}

class Entity {
  declare schema: string; // Crie um tipo sem definir, sem preencher, tipando entity
  declare table: string;
  declare columns: { property: string, column: string }[];
  // faz a entity aceitar acesso dinamico as suas propriedades, 
  // poderia também desligar a flag no ts-config ou usar alguma notação de ts-ignore
  [key:string]: any; 
}

function column(config: { name: string }) {
  return (target: Entity, propertyKey: string) => {
    target.columns = target.columns || [];
    target.columns.push({ property: propertyKey, column: config.name });
  }
}
// Decorator implementation
function entity(config: { schema: string, table: string }) {
  return (constructor: Function) => {
    // É o construtor da Class Entity
    constructor.prototype.schema = config.schema;
    constructor.prototype.table = config.table;
  }
}

@entity({ schema: "branas", table: "book" })
class Book extends Entity {
  @column({ name: "title" })
  title: string;
  @column({ name: "author" })
  author: string;

  constructor(title: string, author: string) {
    super();
    this.title = title;
    this.author = author;
  }
}

async function init() {
  const connection = new PostgresSQLConnection();
  const orm = new ORM(connection);
  const book = new Book("Clean Code", 'Robert Martin');
  await orm.save(book);
  const books = await orm.list();
  console.log('BOOKS', books);
  await connection.close();
}

init();