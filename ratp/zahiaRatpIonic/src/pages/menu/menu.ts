import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { Storage } from '@ionic/storage';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage = "TabsPage";

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    { title: "Home", pageName: 'AllAgentPage', icon: 'home' },
    { title: "Ajouter un agent", pageName: 'AddAgentPage', icon: 'person-add' },
    { title: "Ajouter un suivi", pageName: 'AddFollowedPage', icon: 'clipboard' },
    { title: "Ajouter un EAP", pageName: 'AddEapPage', icon: 'paper' },
    { title: "Ajouter PP", pageName: 'AddPpPage', icon: 'trending-up' },
    { title: "Ajouter une AC", pageName: 'AddAcPage', icon: 'logo-reddit' },
    { title: "Récupérer un agent", pageName: 'RecoverAgentPage', icon: 'contacts' },
    { title: "Modifier le mot de passe", pageName: 'UpdatePasswordPage', icon: 'create' },

  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage
    ) {
  }
  disconnect() {
    this.storage.set('login', '');
    this.navCtrl.setRoot('LoginPage'); 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openPage(page: PageInterface) {
    let params = {};

    if (page.index) {
      params = { tabIndex: page.index };
    }

    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    }
    else {
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return ;
    }
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
  }

}
