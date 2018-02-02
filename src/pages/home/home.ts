import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ApiCepProvider } from '../../providers/api-cep/api-cep';
import { HistoricoDbProvider } from '../../providers/historico-db/historico-db';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    ApiCepProvider,
    HistoricoDbProvider
  ]
})
export class HomePage
{
  cep: any;
  constructor(public navCtrl: NavController, private ApiCepProvider: ApiCepProvider, private historicoDb: HistoricoDbProvider, public FormBuilder: FormBuilder, private alert: AlertController) {

  }
  //função que cria um alert com os valores passados por parametro
  cepAlert(cep) {
    let alert = this.alert.create({
      title: "Endereço",
      message: "<p><b class='titulo'>Logradouro: </b>"+cep.logradouro+"</p><p><b class='titulo'>Bairro: </b>"+cep.bairro+"</p><p><b class='titulo'>localidade: </b>"+cep.localidade+"</p><p><b class='titulo'>UF: </b> "+cep.uf+"</p>",
      buttons: ['FECHAR'],
      cssClass: 'alertInfo'
    });
    alert.present();
  }
  //instancia de FormGroup que recebe o retorno da função group com as validações necessarias
  formCep : FormGroup  = this.FormBuilder.group({
       cep: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
     });


  //função que exibe dados do CEP e salva no banco de dados
  getEndereco(cep){
    let now: Date  = new Date();
    let dataHora: String = "pesquisado em "+((now.getDate()<10)?'0'+(now.getDate()+1): (now.getDate()))+"/"+((now.getMonth()<10)?'0'+(now.getMonth()+1): (now.getMonth()+1))+"/"+now.getFullYear()+" ás "+now.getHours()+":"+now.getMinutes() ;
      this.ApiCepProvider.getCep(cep).then(
        data =>
        {
          this.cep = data;
          //verifica se o cep realmente existe caso for undefined o usuario será notificado
          if (this.cep.erro) {
            let alert = this.alert.create({
              title: "CEP inexistente ou invalido",
              message: "O CEP buscado não pode ser encontrado verifique se digitado corretamente.",
              buttons: ['FECHAR'],
            });
            alert.present();
          }else{
            this.cepAlert(this.cep);
            this.historicoDb.salvarPesquisa(this.cep.cep, dataHora, this.cep.logradouro, this.cep.bairro, this.cep.localidade, this.cep.uf);
          }

        }
      )
  }


}
