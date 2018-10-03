import { DatabaseProvider } from "./../../providers/database/database";
import { AuthProvider } from "./../../providers/auth/auth";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public db: DatabaseProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  openEditPage() {
    this.navCtrl.push("ProfileEditPage");
  }

  openChangePassPage() {
    this.navCtrl.push("ChangePasswordPage");
  }
}
