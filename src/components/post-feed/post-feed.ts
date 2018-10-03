import { PostPage } from "./../../pages/post/post";
import { Component, OnInit, Input } from "@angular/core";
import { DatabaseProvider } from "../../providers/database/database";
import { AuthProvider } from "../../providers/auth/auth";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { NavController } from "ionic-angular";

@Component({
  selector: "post-feed",
  templateUrl: "post-feed.html"
})
export class PostFeedComponent implements OnInit {
  @Input()
  userId: string;

  posts: Observable<any[]>;
  categories: { [key: string]: string };

  constructor(
    private db: DatabaseProvider,
    public navCtrl: NavController,
    public auth: AuthProvider
  ) {
    this.categories = {};
    this.categories["fire_emergency"] = "Fire Emergency";
    this.categories["road_closure_traffic"] = "Road Closure/Traffic";
    this.categories["weather_disaster"] = "Weather & Disaster";
  }

  ngOnInit() {
    this.posts = this.db
      .getRecentPosts()
      .snapshotChanges()
      .pipe(
        map(arr =>
          arr.map(doc => {
            return { id: doc.payload.doc.id, ...doc.payload.doc.data() };
          })
        )
      );
  }

  trackByFn(index, post) {
    return post.id;
  }

  goPostDetail(post, userId) {
    this.navCtrl.push(PostPage, { postInfo: post, currentUserId: userId });
  }
}
