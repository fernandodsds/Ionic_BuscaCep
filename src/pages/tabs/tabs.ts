import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HistoricoPage } from '../historico/historico';
import { HomePage } from '../home/home';

@Component({
  selector:'Tabs-Page',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistoricoPage ;
  tab3Root = AboutPage;

  constructor() {

  }
}
