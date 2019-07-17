import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFollowedPage } from './add-followed';

@NgModule({
  declarations: [
    AddFollowedPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFollowedPage),
  ],
})
export class AddFollowedPageModule {}
