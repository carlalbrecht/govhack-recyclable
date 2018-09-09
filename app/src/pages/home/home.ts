import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProcessingPage } from '../processing/processing';
import { StatsPage } from '../stats/stats';
import { HelpPage } from '../help/help';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  readonly camOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.NATIVE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    cameraDirection: this.camera.Direction.BACK
  };

  constructor(public navCtrl: NavController, public statusbar: StatusBar,
              public camera: Camera, public menuCtrl: MenuController) {
    this.setStatusBar();
  }

  ionViewDidEnter() {
    this.setStatusBar();

    // Prevent menu opening if user taps header back arrow on child page
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(false);
  }

  setStatusBar() {
    this.statusbar.overlaysWebView(false);
    this.statusbar.backgroundColorByHexString("#2E7D32");
    // wtf, this is the only way to make the statusbar text actually stay white
    setTimeout(() => this.statusbar.styleLightContent(), 200);
  }

  captureFrame() {
    this.camera.getPicture(this.camOptions).then((imageData) => {
      this.navCtrl.push(ProcessingPage, {image: imageData},
                        { animate: true,
                          animation: 'md-transition',
                          direction: 'forward' });
    });
  }

  viewStats() {
    this.navCtrl.push(StatsPage, undefined,
                      { animate: true,
                        animation: 'md-transition',
                        direction: 'forward' });
  }

  getHelp() {
    this.navCtrl.push(HelpPage, undefined,
                      { animate: true,
                        animation: 'md-transition',
                        direction: 'forward' });
  }
}
