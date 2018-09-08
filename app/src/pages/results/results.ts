import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

/*
 * The format of data returned from the server as the result of processing an
 * uploaded image.
 */
interface TFResults {

}

@Component({
  selector: 'page-results',
  templateUrl: 'results.html'
})
export class ResultsPage {
  // Nav parameters
  image: string;
  results: TFResults;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public statusbar: StatusBar) {
    // Unconditionally retrieve parameters, as we assume that if we have nav'd
    // to this page, we have succeeded in processing the captured image
    this.image = navParams.get("image");
    this.results = navParams.get("results");
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
}
