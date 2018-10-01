import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { CreateAccountPage } from '../create-account/create-account';
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../../pages/tabs/tabs";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup() {
    this.navCtrl.push(CreateAccountPage);
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        () => this.navCtrl.setRoot(TabsPage),
        error => {
          console.log(error.message);
          const toast = this.toastCtrl.create({
            message: error.message,
            duration: 3000
          });
          toast.present();
        }
      );
  }
}
