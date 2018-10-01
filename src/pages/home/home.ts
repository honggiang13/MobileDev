import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    if (this.platform.is('cordova')) {
    }

  }

}
