import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { Injectable } from "@angular/core";

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {
  constructor(public Geolocation: Geolocation) {
    console.log("GeolocationProvider Provider");
  }

  getCurrentPosition(): Promise<Geoposition> {
    return this.Geolocation.getCurrentPosition();
  }
}
