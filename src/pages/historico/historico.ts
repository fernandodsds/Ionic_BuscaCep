import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HistoricoDbProvider } from '../../providers/historico-db/historico-db';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html',
  providers: [
   HistoricoDbProvider
  ]
})
export class HistoricoPage {
  public historico = new Array<any>();
  constructor(public navCtrl: NavController, private historicoDb: HistoricoDbProvider, private alert: AlertController) {
  }

  //função que exclui registro utiliza o AlertController para confirmação do usuário e HistoricoDbProvider para utilizar as funções do banco de dados
  excluiRegistro(item: any)
   {
    let alert = this.alert.create({
       title: 'Você deseja mesmo deletar esse registro?',
       message: 'Após deletado o registro não poderá ser recuperado',
       buttons: [
         {
           text: 'Ok',
           handler: () =>
           {
             //chama função que exlui registros e passa o id do item por parametro
             this.historicoDb.excluirRegistro(item.id)
             .then(() =>
               {
                   //exclui o item do Array que é populado no template
                   var index = this.historico.indexOf(item);
                   this.historico.splice(index, 1);
                });
            }
         },
         {
           text: 'Cancel',
           cssClass:'danger',
           role:'cancel',
           handler: () =>
           {
             return ;
           }
         }
       ],
       cssClass:'alertDanger'
     });
     alert.present();
   }


  // função que é disparada toda vez que entra na page
  ionViewWillEnter(){
    //chama função que mostra todas as pesquisas ou seja o historico
    this.historicoDb.mostrarPesquisas()
    .then(res=>{
      this.historico = res;
    })
    .catch(e=>{
      alert("Erro no banco de dados");

    });
  }

}
