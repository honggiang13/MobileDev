import { Component } from "@angular/core";
import { NavController, IonicPage} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from '../../pages/tabs/tabs';
import { LoadingController } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-create-account",
  templateUrl: "create-account.html"
})
export class CreateAccountPage {
  signupError: string;
  form: FormGroup;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(
    public auth: AuthProvider,
    fb: FormBuilder,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
  ) {
    this.form = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  signup() {
    debugger;
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    const loader = this.loadingCtrl.create({
      content: "Signing up..."
    });
    loader.present();
    this.auth
      .signUp(credentials)
      .then(
        async () => {
          loader.dismiss();
          await this.navCtrl.setRoot(TabsPage);
        },
        error => {
          loader.dismiss();
          this.signupError = error.message;
        }
      );
  }
}
