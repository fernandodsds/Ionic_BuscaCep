import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Provider que tem por finalidade consumir API ViaCep
@Injectable()
export class ApiCepProvider {
  constructor(public http: HttpClient) {
    console.log('Hello ApiCepProvider Provider');
  }
  //função que consome a API ViaCep
  getCep(cep)
  {
    return new Promise(resolve => this.http.get("https://viacep.com.br/ws/"+cep+"/json/").subscribe(
      data => {
          resolve(data);
      },
      error => {
        console.log(error);
      }
    )
  );
  }


}
