import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../../pages/tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  signup(){
    this.navCtrl.push(CreateAccountPage);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(TabsPage),
        error => console.log(error.message)
      );
  }
}
