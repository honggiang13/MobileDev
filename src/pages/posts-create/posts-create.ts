import { GeocoderProvider } from "./../../providers/geocoder/geocoder";
import { GeolocationProvider } from "./../../providers/geolocation/geolocation";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { DatabaseProvider, Post } from "../../providers/database/database";
import { AuthProvider } from "../../providers/auth/auth";
import { AnalyticsProvider } from "../../providers/analytics/analytics";

@IonicPage()
@Component({
  selector: "page-posts-create",
  templateUrl: "posts-create.html"
})
export class PostsCreatePage {
  post: Partial<Post> = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public auth: AuthProvider,
    public analytics: AnalyticsProvider,
    private geolocation: GeolocationProvider,
    private nativeGeocoder: GeocoderProvider,
    private platform: Platform
  ) {
    this.post = {};
  }

  async ionViewDidLoad() {
    console.log("ionViewDidLoad PostsCreatePage");
    let coordinates = await this.geolocation.getCurrentPosition();
    if (this.platform.is("cordova")) {
      let geoCoder = await this.nativeGeocoder.reverseGeocode(
        coordinates.coords.latitude,
        coordinates.coords.longitude
      );
      this.post.location =
        geoCoder[0].administrativeArea +
        ", " +
        geoCoder[0].locality +
        ", " +
        geoCoder[0].countryName;
    } else {
      this.post.location =
        "Latitute: " +
        coordinates.coords.latitude +
        ", longtitute: " +
        coordinates.coords.longitude;
    }
  }

  async create(user) {
    await this.db.createPost(user.uid, this.post as Post);
    await this.analytics.logEvent("create_post", {});
    this.post = {};
    await this.navCtrl.setRoot("HomePage");
  }

  updateURL(e) {
    this.post.image = e;
  }
}
