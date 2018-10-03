import { Injectable } from "@angular/core";
import { Firebase } from "@ionic-native/firebase";
import { Platform } from "ionic-angular";
import { AngularFirestore } from "angularfire2/firestore";
import { tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { AuthProvider } from "../auth/auth";
import { Device } from "@ionic-native/device";

@Injectable()
export class FcmProvider {
  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    private auth: AuthProvider,
    private device: Device
  ) {}

  async getToken() {
    let token;

    if (this.platform.is("cordova")) {
      const status = await this.firebaseNative.hasPermission();

      if (status.isEnabled) {
        console.log("already enabled");
        return;
      }

      token = await this.firebaseNative.getToken();
    }

    if (this.platform.is("ios")) {
      await this.firebaseNative.grantPermission();
    }

    return this.saveTokenToFirestore(token);
  }

  // Saves the token to Firestore when refreshed
  monitorTokenRefresh() {
    if (this.platform.is("cordova")) {
      return this.firebaseNative
        .onTokenRefresh()
        .pipe(tap(token => this.saveTokenToFirestore(token)));
    } else {
      // PWA implementation
      return of(null);
    }
  }

  private async saveTokenToFirestore(token) {
    if (!token) return;
    const devicesRef = this.afs.collection("devices");

    const user = await this.auth.getCurrentUser();

    const docData = {
      token,
      userId: user.uid,
      //device: Object.assign({}, this.device)
      device: {
        uuid: this.device.uuid,
        model: this.device.model,
        platform: this.device.platform,
        version: this.device.version,
        manufacturer: this.device.version,
        serial: this.device.serial
      }
    };

    return devicesRef.doc(token).set(docData);
  }

  async subscribeTo(topic: string) {
    const user = await this.auth.getCurrentUser();

    if (this.platform.is("cordova")) {
      await this.firebaseNative.subscribe(topic);
    }

    const topics = { [topic]: true };
    return this.afs
      .collection("users")
      .doc(user.uid)
      .set({ topics }, { merge: true });
  }

  async unsubscribeFrom(topic: string) {
    const user = await this.auth.getCurrentUser();

    if (this.platform.is("cordova")) {
      await this.firebaseNative.unsubscribe(topic);
    }

    const topics = { [topic]: false };
    return this.afs
      .collection("users")
      .doc(user.uid)
      .set({ topics }, { merge: true });
  }

  async updateSubscribe(datas: string[]) {
    let topics: { [key: string]: any };
    const user = await this.auth.getCurrentUser();

    datas.forEach(topic => {
      topics[topic] = true;
    });

    if (this.platform.is("cordova")) {
      user.topics.array.forEach(async element => {
        await this.firebaseNative.unsubscribe(element);
      });
      datas.forEach(async topic => {
        await this.firebaseNative.subscribe(topic);
      });
    }
    return this.afs
      .collection("users")
      .doc(user.uid)
      .update({ topics });
  }

  // Handle incoming messages
  listenToNotifications() {
    if (this.platform.is("cordova")) {
      return this.firebaseNative.onNotificationOpen();
    } else {
      // PWA implementation
      return of(null);
    }
  }

  // Add this to the logout method to end notifications
  stopNotifications() {
    return this.firebaseNative.unregister();
  }
}
