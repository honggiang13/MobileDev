import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { TakePhotoPage } from '../take-photo/take-photo';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = 'HomePage';
  tab2Root: any = 'PostsCreatePage';
  tab3Root: any = 'SettingsPage';

  constructor(public auth: AuthProvider) {

  }

  ionViewCanEnter() {
    return this.auth.isLoggedIn();
  }
}
