import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEapPage } from './add-eap';

@NgModule({
  declarations: [
    AddEapPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEapPage),
  ],
})
export class AddEapPageModule {}
