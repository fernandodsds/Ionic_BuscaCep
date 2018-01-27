import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//Provider que tem por finalidade executar ações no banco de dados
@Injectable()
export class HistoricoDbProvider {
//no contrutor verifica-se a existencia da tabela historico, caso não exista é criada
  constructor(public sqlite: SQLite) {
    this.sqlite.create({
    name: 'buscacep.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
    db.executeSql('CREATE TABLE IF NOT EXISTS historico(id INTEGER PRIMARY KEY, cep TEXT, data TEXT, logradouro TEXT, bairro TEXT, localidade TEXT, uf TEXT)', {})
    .then(res => console.log('Executed SQL'))
    .catch(e => console.log(e));
  });

}

//executa um insert na tabela historico
  salvarPesquisa(cep, data, logradouro, bairro, localidade, uf){
      this.sqlite.create(
        {
        name: 'buscacep.db',
        location:'default'
        }).then(
        (db: SQLiteObject) =>{
            db.executeSql('INSERT INTO historico VALUES(NULL,?,?,?,?,?,?)',[cep,data, logradouro, bairro, localidade, uf])
          .then(res => {
            console.log(res);
          })
          .catch(e =>
            {
              console.log(e);
            })
        }).catch(e =>
          {
            console.log(e);

          });
  }
//executa um select na tabela historico que retorna todos os registros
  mostrarPesquisas(){
      return this.sqlite.create({
        name: 'buscacep.db',
        location:'default'
        }).then(
        (db: SQLiteObject) =>{
          return db.executeSql('SELECT * FROM historico order by id desc',[])
          .then(data => {
            if(data.rows.length > 0)
            {
              let historico: any[] = [];
              for (var i = 0; i < data.rows.length; i++)
              {
                var item = data.rows.item(i);
                historico.push(item);
              }
              return historico;
            }
          })
          .catch(e =>
            {
              return [e];
            })
        }).catch(e =>
          {
            return [e];
          })

  }

//executa um delete na tabela historico através o id passado por parametro
  excluirRegistro(id: number){
    return  this.sqlite.create({
      name: 'buscacep.db',
      location:'default'
    })
    .then(
      (db: SQLiteObject) => {
        return db.executeSql('delete from historico where id = ?', [id])
          .catch(e => {
            return e
          });
      })
      .catch(e => {return e});
  }

}
