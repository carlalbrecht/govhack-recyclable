import { Component } from '@angular/core';
import { NavController, NavParams, Platform, normalizeURL } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { ImprovePage } from '../improve/improve';

/*
 * The format of data returned from the server as the result of processing an
 * uploaded image.
 */
interface TFResults {
  weights: { [objectType: string]: number },
  recyclable: boolean | null;
}

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  // Nav parameters
  image: string;
  results: TFResults;

  // Can be "Recyclable", "Garbage", (potentially in the future) "Green Waste"
  // or "Unsure" if the NN can't determine the object's recyclability
  garbageType: string = "Recyclable";
  // How confident overall the NN is of its classification
  confidence: string = "83%";
  // The classification produced by the NN
  objectType: string = "beer bottle";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public statusbar: StatusBar, public platform: Platform) {
    // Unconditionally retrieve parameters, as we assume that if we have nav'd
    // to this page, we have succeeded in processing the captured image
    let image = navParams.get("image");
    this.results = navParams.get("results");

    if (platform.is('ios'))
      this.image = normalizeURL(image);
    else
      this.image = image;

    this.setStatusBar();
  }

  ionViewDidEnter() {
    this.setStatusBar();
  }

  setStatusBar() {
    this.statusbar.overlaysWebView(false);
    this.statusbar.backgroundColorByHexString("#2E7D32");
    // wtf, this is the only way to make the statusbar text actually stay white
    setTimeout(() => this.statusbar.styleLightContent(), 200);
  }

  gotoImprove() {
    this.navCtrl.push(ImprovePage, undefined,
                      { animate: true,
                        animation: 'md-transition',
                        direction: 'forward' });
  }
}
