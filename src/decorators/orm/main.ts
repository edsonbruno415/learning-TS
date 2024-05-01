import pgp from "pg-promise";

interface Connection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

class PostgresSQLConnection implements Connection{
  pgp: any;
  constructor(){
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
  constructor(readonly connection: Connection){

  }
  async save(entity: Entity){
    // const params: any = [];
    // this.connection.query(`insert into ${entity.schema}.${entity.table} ...`, params);
    this.connection.query("insert into branas.book (title,author) values ($1, $2)",['Clean Code', 'Robert Martin']);
  }
}

class Entity {
  declare schema: string; //Crie um tipo sem definir, sem preencher, tipando entity
  declare table: string;
}

class Book  extends Entity{
  title: string;
  author: string;

  constructor(title: string, author: string) {
    super();
    this.author = author;
    this.title = title;
  }
}

async function init() {
  const connection = new PostgresSQLConnection();
  const orm = new ORM(connection);
  const book = new Book("Clean Code", 'Robert Martin');
  await orm.save(book);
  await connection.close();
}

init();