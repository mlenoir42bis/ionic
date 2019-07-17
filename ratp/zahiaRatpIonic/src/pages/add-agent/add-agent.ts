import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-agent',
  templateUrl: 'add-agent.html',
})
export class AddAgentPage implements OnInit {

  agentForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAgentPage');
  }

  ngOnInit() {
    console.log("hello add agent");
    this.initForm();
  }

  initForm() {
    this.agentForm = this.fb.group({
      matricule_agents: ['', Validators.required],
      nom_agents: ['', Validators.required],
      date_validite_permis: ['', Validators.required],
      date_validite_FCO: ['', Validators.required],
      matricule_REL: ['', Validators.required],
      nom_site: ['', Validators.required],
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.agentForm);

    if (this.agentForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.agentForm.value.matricule_agents,
        nom_agents: this.agentForm.value.nom_agents,
        date_validite_permis: this.agentForm.value.date_validite_permis,
        date_validite_FCO: this.agentForm.value.date_validite_FCO,
        matricule_REL: this.agentForm.value.matricule_REL,
        nom_site: this.agentForm.value.nom_site
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/create_new_Agent.php', data, options)
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
