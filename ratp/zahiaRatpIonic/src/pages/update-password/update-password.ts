import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage implements OnInit {

  updatePasswordForm: FormGroup;
  login: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController,
    private storage: Storage
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordPage');
  }

  ngOnInit() {
    console.log("hello add agent");
    this.initForm();
  }

  initForm() {
    this.updatePasswordForm = this.fb.group({
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required],
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.updatePasswordForm);

    if (this.updatePasswordForm.status == "VALID") {
      console.log("form valid");

      this.storage.get('login').then((val)=>{
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
        let options = new RequestOptions({ headers: headers });
        
        let data = {
          password: this.updatePasswordForm.value.password,
          login: val,
        };

      this.http.post('http://www.frameworck.me/projetPhp/modif_password.php', data, options)
        .subscribe((res:any) => {
          console.log(res);
  
          //let dataRet = JSON.parse(res._body);
  
          console.log(res._body);
        });
      


      });


    
  
    }
    else {
      console.log("form invalid");
    }
  }
}
