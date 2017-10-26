import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateInfoPage } from './create-info';

@NgModule({
  declarations: [
    CreateInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateInfoPage),
  ],
})
export class CreateInfoPageModule {}
