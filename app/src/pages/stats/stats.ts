import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-help',
  templateUrl: 'stats.html'
})
export class StatsPage {
  constructor(public navCtrl: NavController, public statusbar: StatusBar) {
    this.setStatusBar();
  }

  ionViewDidEnter() {
    this.setStatusBar();
  }

  setStatusBar() {
    this.statusbar.overlaysWebView(false);
    this.statusbar.backgroundColorByHexString("#1565C0");
    setTimeout(() => this.statusbar.styleLightContent(), 200);
  }
}
