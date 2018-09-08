import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-improve',
  templateUrl: 'improve.html'
})
export class ImprovePage {
  objectType: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) { }
}
