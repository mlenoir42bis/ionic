import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAcPage } from './add-ac';

@NgModule({
  declarations: [
    AddAcPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAcPage),
  ],
})
export class AddAcPageModule {}
