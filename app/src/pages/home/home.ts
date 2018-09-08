import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { ProcessingPage } from '../processing/processing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  readonly camOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    cameraDirection: this.camera.Direction.BACK
  };

  constructor(public navCtrl: NavController, public statusbar: StatusBar,
              public camera: Camera) { }

  ionViewDidEnter() {
    this.setStatusBar();
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
}
