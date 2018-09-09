import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileTransferObject, FileUploadOptions }
       from '@ionic-native/file-transfer';

import { HomePage } from '../home/home';
import { ResultsPage } from '../results/results';

import { INetPaths } from '../../app/config';

@Component({
  selector: 'page-processing',
  templateUrl: 'processing.html'
})
export class ProcessingPage implements OnInit {
  // Path to send the image for processing
  readonly uploadURL: string = INetPaths.HOST + INetPaths.ENDPOINT_IMG_UPLOAD;

  image: string;
  loadingStatus: string = 'Getting ready...';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public statusbar: StatusBar, public transfer: FileTransfer) {
    this.image = navParams.get("image");

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
        console.log(JSON.stringify(data));
        // Navigate to results page
        this.navCtrl.pop({ animate: false });
        this.navCtrl.push(ResultsPage,
                          { image: this.image, results: data.response },
                          { animate: true,
                            animation: 'md-transition',
                            direction: 'forward' });
      }, (err) => {
        // Navigate back to home page and show error dialog (TODO: actually
        // implement the error dialog on `HomePage`)
        this.navCtrl.setRoot(HomePage, {reason: "FailedUpload"},
                             { animate: true,
                               animation: 'md-transition',
                               direction: 'back' });
      });
  }
}
