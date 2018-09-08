import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-processing',
  templateUrl: 'processing.html'
})
export class ProcessingPage implements OnInit {
  image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.image = this.navParams.get("image");
  }

  ngOnInit() {

  }
}
