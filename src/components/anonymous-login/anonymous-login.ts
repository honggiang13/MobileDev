import { Component } from "@angular/core";
import { AuthProvider } from "../../providers/auth/auth";
import { NavController } from "ionic-angular";
import { LoadingController } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TabsPage } from "../../pages/tabs/tabs";

@Component({
  selector: "anonymous-login",
  templateUrl: "anonymous-login.html"
})
export class AnonymousLoginComponent {
  loginForm: FormGroup;
  loginError: string;

  constructor(
    public auth: AuthProvider,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  async login() {
    const loader = this.loadingCtrl.create({
      content: "Logging in..."
    });

    loader.present();

    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signInWithEmail(credentials).then(
      async () => {
        debugger;
        loader.dismiss();
        await this.navCtrl.setRoot(TabsPage);
      },
      error => {
        debugger;
        loader.dismiss();
        this.loginError = error.message;
      }
    );
  }
}
