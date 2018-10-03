import { Component, Input } from "@angular/core";
import { FcmProvider } from "../../providers/fcm/fcm";
import { Platform } from "ionic-angular";

@Component({
  selector: "fcm-topic",
  templateUrl: "fcm-topic.html"
})
export class FcmTopicComponent {
  @Input()
  user: any;
  categories: string[];

  constructor(public fcm: FcmProvider, private platform: Platform) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categories = [];
    Object.keys(this.user.topics).forEach(category => {
      if (this.user.topics[category]) this.categories.push(category);
    });
  }

  get isSupportedPlatform() {
    return this.platform.is("cordova");
  }

  updateFcmTopic() {
    this.fcm.updateSubscribe(this.categories);
  }
}
