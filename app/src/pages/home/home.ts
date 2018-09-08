import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  readonly camOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: false,
    cameraDirection: this.camera.Direction.BACK
  };

  constructor(public navCtrl: NavController, public statusbar: StatusBar,
              public camera: Camera) {
    statusbar.overlaysWebView(false);
    statusbar.backgroundColorByHexString("#2E7D32");
    // wtf, this is the only way to make the statusbar text actually stay white
    setTimeout(() => statusbar.styleLightContent(), 200);
  }

  captureFrame() {
    this.camera.getPicture(this.camOptions).then((imageData) => {
      this.navCtrl.setRoot('page-processing', {image: imageData},
                           { animate: true,
                             animation: 'md-transition',
                             direction: 'forward' });
    });
  }
}
