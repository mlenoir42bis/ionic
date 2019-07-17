import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';

import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  credentials = {} as usercreds;
  authForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public authservice: AuthProvider, public toastCtrl: ToastController) {
    this.authForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.email])],
		  'password': [null, Validators.compose([Validators.required])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  submitForm(value: any):void{
    console.log(value);
    console.log(this.credentials);
    
    /*
    this.authservice.signup(this.credentials).then((res: any) => {

      if (!res.code) {
        let toast = this.toastCtrl.create({
          message: "Success",
          duration: 30000,
          position: 'top',
          cssClass: "toast success"
        });
        toast.present();
        this.navCtrl.push(HomePage);
      }
      else {
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 5000,
          position: 'top',
          cssClass: "toast error"
        });
        toast.present();
      }

    })
    */
    
  }
  signin() {
    this.navCtrl.push(HomePage);
  }	
}
