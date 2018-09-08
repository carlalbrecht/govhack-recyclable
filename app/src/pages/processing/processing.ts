import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileTransferObject, FileUploadOptions }
       from '@ionic-native/file-transfer';

@Component({
  selector: 'page-processing',
  templateUrl: 'processing.html'
})
export class ProcessingPage implements OnInit {
  // Change this for production use
  readonly uploadURL: string = 'http://192.168.43.133/api/test';

  image: string;
  loadingStatus: string = 'Getting ready...';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public statusbar: StatusBar, public transfer: FileTransfer) {
    this.image = this.navParams.get("image");

    // Make status bar transparent and overlaid over content
    statusbar.overlaysWebView(true);
    setTimeout(() => statusbar.styleBlackTranslucent(), 200);
  }

  /*
   * Initiate and monitor image upload progress
   */
  ngOnInit() {
    const progressBar: HTMLElement =
      document.getElementById("fullscreen-progress");

    const uploadOptions: FileUploadOptions = {
      httpMethod: "POST",
      mimeType: "image/jpeg",
      chunkedMode: true,
      headers: {}
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Update progress bar on upload progress update
    fileTransfer.onProgress((progressEvent: ProgressEvent) => {
      const percentage =
        Math.round((progressEvent.loaded / progressEvent.total) * 100);

      if (percentage == 100) {
        // Upload finished; server is processing image
        this.loadingStatus = "Admiring your photography skills...";
        progressBar.className += " indeterminate";
      } else {
        // Still uploading the photo to the server
        this.loadingStatus = "Uploading image...";
        progressBar.style.width = percentage + "%";
      }
    });

    // IMPORTANT: change 4th param to false for production use
    fileTransfer.upload(this.image, this.uploadURL, uploadOptions, true)
      .then((data) => {

      }, (err) => {

      });
  }
}
