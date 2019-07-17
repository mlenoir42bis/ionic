import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';  

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from '../../providers/auth/auth';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials = {} as usercreds;
  authForm : FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider, private fb: FormBuilder, public toastCtrl: ToastController, public alertCtrl: AlertController, public afireauth: AngularFireAuth) {
    this.authForm = fb.group({
		  'email' : [null, Validators.compose([Validators.required, Validators.email])],
		  'password': [null, Validators.compose([Validators.required])]
		});
  }

  submitForm(value: any):void{
    console.log(value);
    console.log(this.credentials);
    
    this.authservice.login(this.credentials).then((res: any) => {
      console.log(res);
      if (!res.code) {
        var user = this.afireauth.auth.currentUser;
        this.navCtrl.push(TabsPage);
        console.log('login ok');
        console.log(user);
      }
      else {
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 5000,
          position: 'top',
          cssClass: "toast error"
        });
        toast.present();
        console.log(res);
      }
    })
  }	

  passwordresetButton() {
      let prompt = this.alertCtrl.create({
        message: "Entrez votre address email pour reinitialiser votre password",
        inputs: [
          {
            name: 'email',
            placeholder: 'Your email'
          },
        ],
        buttons: [
          {
            text: 'Retour',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Envoyer',
            handler: data => {
              console.log('Saved clicked');
              this.authservice.resetPassword(data.email).then((res: any) => {
                if (res.code) {
                  let toast = this.toastCtrl.create({
                    message: res.message,
                    duration: 5000,
                    position: 'top',
                    cssClass: "toast error"
                  });
                  toast.present();
                }
                else {
                  let toast = this.toastCtrl.create({
                    message: "Message envoyé",
                    duration: 5000,
                    position: 'top',
                    cssClass: "toast success"
                  });
                  toast.present();
                }
              })
            }
          }
        ]
      });
      prompt.present();
  }
   
  signup() {
    this.navCtrl.push(SignupPage);
  }

}
