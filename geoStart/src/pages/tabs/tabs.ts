import { Component } from '@angular/core';

import { DashPage } from '../dash/dash';
import { CreatePage } from '../create/create';
import { SettingPage } from '../setting/setting';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = DashPage;
  tab2Root: any = CreatePage;
  tab3Root: any = SettingPage;

  constructor() {
  }

}
