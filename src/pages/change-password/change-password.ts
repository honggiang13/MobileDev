import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  updatePassError: string;
  form: FormGroup;
  constructor(
    public auth: AuthProvider,
    public navCtrl: NavController,
    fb: FormBuilder,
    public navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.form = fb.group({
      newPass: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  updatePass() {
    let newPass = this.form.value.newPass;
    this.auth
      .changePassword(newPass)
      .then(result => {
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
        const toast = this.toastCtrl.create({
          message: error.message,
          duration: 3000
        });
        toast.present();
      });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChangePasswordPage");
  }
}
