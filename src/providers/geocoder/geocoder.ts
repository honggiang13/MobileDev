import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
import { Injectable } from "@angular/core";

/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {
  constructor(private nativeGeocoder: NativeGeocoder) {
    console.log("GeocoderProvider Provider");
  }

  reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<NativeGeocoderReverseResult[]> {
    return this.nativeGeocoder.reverseGeocode(latitude, longitude);
  }
}
