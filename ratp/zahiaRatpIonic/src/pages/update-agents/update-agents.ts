import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the UpdateAgentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-agents',
  templateUrl: 'update-agents.html',
})
export class UpdateAgentsPage implements OnInit {

  updAgentForm : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fb: FormBuilder, 
    private http: Http,
    public loading: LoadingController
    ) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get("matricule_agents"));
  }
  
  ngOnInit() {
    console.log("hello add agent");
    
    this.initForm();

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    let options = new RequestOptions({ headers: headers });
    
    let data = {
      matricule_agents: this.navParams.get("matricule_agents")
    };
    
    this.http.post('http://www.frameworck.me/projetPhp/getAgentById.php', data, options)
      .subscribe((res:any) => {
        console.log(res);

        let datas = JSON.parse(res._body);
        
        if (datas.data.length > 0) {
          this.updAgentForm = this.fb.group({
            matricule_agents: [datas.data[0].matricule_agents],
            date_validite_permis: [datas.data[0].date_validite_permis],
            date_validite_FCO: [datas.data[0].date_validite_FCO],
            nom_site: [datas.data[0].nom_site],
            dates_suivi: [datas.data[0].dates_suivi],
            prochaine_date_suivi: [datas.data[0].prochaine_date_suivi],
            commentaire_suivi: [datas.data[0].commentaire_suivi],
            derniere_date_EAP: [datas.data[0].derniere_date_EAP],
            prochaine_date_EAP: [datas.data[0].prochaine_date_EAP],
            commentaire_EAP: [datas.data[0].commentaire_EAP],
            dates_validation_AC: [datas.data[0].dates_validation_AC],
            commentaire_AC: [datas.data[0].commentaire_AC],
            date_ouverture_PP: [datas.data[0].date_ouverture_PP],
            date_cloture_PP: [datas.data[0].date_cloture_PP],
            commentaire_PP: [datas.data[0].commentaire_PP],
            total_jours_absences: [datas.data[0].total_jours_absences],
            jour_reaccueil: [datas.data[0].jour_reaccueil],
            commentaire_reaccueil: [datas.data[0].commentaire_reaccueil],
          });
        }
      });

  }

  initForm() {
    this.updAgentForm = this.fb.group({
      matricule_agents: [''],
      date_validite_permis: [''],
      date_validite_FCO: [''],
      nom_site: [''],
      dates_suivi: [''],
      prochaine_date_suivi: [''],
      commentaire_suivi: [''],
      derniere_date_EAP: [''],
      prochaine_date_EAP: [''],
      commentaire_EAP: [''],
      dates_validation_AC: [''],
      commentaire_AC: [''],
      date_ouverture_PP: [''],
      date_cloture_PP: [''],
      commentaire_PP: [''],
      total_jours_absences: [''],
      jour_reaccueil: [''],
      commentaire_reaccueil: [''],
    });
  }

  submitForm() {

    console.log('submit');
    console.log(this.updAgentForm);

    if (this.updAgentForm.status == "VALID") {
      console.log("form valid");

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        matricule_agents: this.navParams.get("matricule_agents"),
        date_validite_permis: this.updAgentForm.value.date_validite_permis,
        date_validite_FCO: this.updAgentForm.value.date_validite_FCO,
        nom_site: this.updAgentForm.value.nom_site,
        dates_suivi: this.updAgentForm.value.dates_suivi,
        prochaine_date_suivi: this.updAgentForm.value.prochaine_date_suivi,
        commentaire_suivi: this.updAgentForm.value.commentaire_suivi,
        derniere_date_EAP: this.updAgentForm.value.derniere_date_EAP,
        prochaine_date_EAP: this.updAgentForm.value.prochaine_date_EAP,
        commentaire_EAP: this.updAgentForm.value.commentaire_EAP,
        dates_validation_AC: this.updAgentForm.value.dates_validation_AC,
        commentaire_AC: this.updAgentForm.value.commentaire_AC,
        date_ouverture_PP: this.updAgentForm.value.date_ouverture_PP,
        date_cloture_PP: this.updAgentForm.value.date_cloture_PP,
        commentaire_PP: this.updAgentForm.value.commentaire_PP,
        total_jours_absences: this.updAgentForm.value.total_jours_absences,
        jour_reaccueil: this.updAgentForm.value.jour_reaccueil,
        commentaire_reaccueil: this.updAgentForm.value.commentaire_reaccueil,
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/modif_agent.php', data, options)
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
