import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddPpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-pp',
  templateUrl: 'add-pp.html',
})
export class AddPpPage implements OnInit {

  ppForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPpPage');
  }

  ngOnInit() {
    console.log("hello add agent");
    this.initForm();
  }

  initForm() {
    this.ppForm = this.fb.group({
      matricule_agents: ['', Validators.required],
      date_ouverture_PP: [''],
      date_cloture_PP: [''],
      commentaire_PP: [''],
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.ppForm);

    if (this.ppForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.ppForm.value.matricule_agents,
        date_ouverture_PP: this.ppForm.value.date_ouverture_PP,
        date_cloture_PP: this.ppForm.value.date_cloture_PP,
        commentaire_PP: this.ppForm.value.commentaire_PP
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/create_new_PP.php', data, options)
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
