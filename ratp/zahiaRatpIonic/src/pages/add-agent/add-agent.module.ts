import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAgentPage } from './add-agent';

@NgModule({
  declarations: [
    AddAgentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAgentPage),
  ],
})
export class AddAgentPageModule {}
