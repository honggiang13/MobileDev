import { FcmProvider } from "./../../providers/fcm/fcm";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-post",
  templateUrl: "post.html"
})
export class PostPage {
  public post: any;
  public postUser: Observable<any>;
  isFollowing: any;
  currentUserId: any;

  constructor(
    public navCtrl: NavController,
    public db: DatabaseProvider,
    public auth: AuthProvider,
    public navParams: NavParams,
    private fcm: FcmProvider
  ) {
    this.post = this.navParams.get("postInfo");
    this.currentUserId = this.navParams.get("currentUserId");
    this.postUser = this.db.getUserInfo(this.post.userId);
    this.auth.getCurrentUser().then(user => {
      this.isFollowing = user.topics[this.post.category];
    });
  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad PostPage");
  }

  async updateFollowing() {
    if (this.isFollowing) {
      await this.fcm.subscribeTo(this.post.category);
    } else {
      await this.fcm.unsubscribeFrom(this.post.category);
    }
  }
}
