import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddAcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-ac',
  templateUrl: 'add-ac.html',
})
export class AddAcPage implements OnInit{

  acForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAcPage');
  }

  ngOnInit() {
    console.log("hello add ac");
    this.initForm();
  }

  initForm() {
    this.acForm = this.fb.group({
      matricule_agents: ['', Validators.required],
      dates_validation_AC: [''],
      commentaire_AC: ['']
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.acForm);

    if (this.acForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.acForm.value.matricule_agents,
        dates_validation_AC: this.acForm.value.dates_validation_AC,
        commentaire_AC: this.acForm.value.commentaire_AC
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/create_new_AC.php', data, options)
        .subscribe((res:any) => {
          console.log(res);
  
          //let dataRet = JSON.parse(res._body);
  
          console.log(res._body);
        });
  

    }
    else {
      console.log("form invalid");
    }
  }
}
