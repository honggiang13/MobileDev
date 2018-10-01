import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateAccountPage } from './create-account';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateAccountPage),
    ComponentsModule
  ],
})
export class CreateAccountPageModule {}
