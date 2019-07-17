import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddEapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-eap',
  templateUrl: 'add-eap.html',
})
export class AddEapPage implements OnInit {

  eapForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEapPage');
  }

  ngOnInit() {
    console.log("hello add agent");
    this.initForm();
  }

  initForm() {
    this.eapForm = this.fb.group({
      matricule_agents: ['', Validators.required],
      derniere_date_EAP: ['', Validators.required],
      prochaine_date_EAP: ['', Validators.required],
      commentaire_EAP: [''],
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.eapForm);

    if (this.eapForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.eapForm.value.matricule_agents,
        derniere_date_EAP: this.eapForm.value.derniere_date_EAP,
        prochaine_date_EAP: this.eapForm.value.prochaine_date_EAP,
        commentaire_EAP: this.eapForm.value.commentaire_EAP
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/create_new_EAP.php', data, options)
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
