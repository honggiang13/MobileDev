import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DatabaseProvider } from "../../providers/database/database";
import { AuthProvider } from "../../providers/auth/auth";

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
  public postUser: any;
  isFollowing: any;
  currentUserId: any;

  constructor(
    public navCtrl: NavController,
    public db: DatabaseProvider,
    public auth: AuthProvider,
    public navParams: NavParams
  ) {
    this.post = this.navParams.get("postInfo");
    this.currentUserId = this.navParams.get("currentUserId");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.db.isFollowing(
      this.currentUserId,
      this.post.userId
    ).subscribe(val =>{
      this.isFollowing = val;
    })
  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad PostPage");
  }

  async updateFollowing() {
    if (this.isFollowing) {
      await this.db.follow(this.currentUserId, this.post.userId);
    } else {
      await this.db.unfollow(this.currentUserId, this.post.userId);
    }
  }
}
