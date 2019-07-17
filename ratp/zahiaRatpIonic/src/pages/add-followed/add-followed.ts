import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddFollowedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-followed',
  templateUrl: 'add-followed.html',
})
export class AddFollowedPage implements OnInit{

  followedForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFollowedPage');
  }

  ngOnInit() {
    console.log("hello add agent");
    this.initForm();
  }

  initForm() {
    this.followedForm = this.fb.group({
      matricule_agents: ['', Validators.required],
      dates_suivi: ['', Validators.required],
      prochaine_date_suivi: ['', Validators.required],
      commentaire_suivi: [''],
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.followedForm);

    if (this.followedForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.followedForm.value.matricule_agents,
        dates_suivi: this.followedForm.value.dates_suivi,
        prochaine_date_suivi: this.followedForm.value.prochaine_date_suivi,
        commentaire_suivi: this.followedForm.value.commentaire_suivi
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/create_new_SUIVI.php', data, options)
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
