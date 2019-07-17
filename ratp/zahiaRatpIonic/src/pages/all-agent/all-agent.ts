import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

/**
 * Generated class for the AllAgentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-agent',
  templateUrl: 'all-agent.html',
})
export class AllAgentPage {

  datas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private http: Http,
    public loading: LoadingController,
    private storage: Storage,
    private localNotifications: LocalNotifications
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllAgentPage test');

    this.getAgents();
   
    this.getAlert();
  }

  getAlert() {
    console.log('get alert');
    this.storage.get('login').then((val) => {
      
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        login: val
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/get_alert.php', data, options)
        .subscribe((res:any) => {
          
           console.log("res get alert");
           console.log(res);
  
          let retData = JSON.parse(res._body);
  
          console.log(retData);
         
        });


    });
  }

  getAgents() {

    this.storage.get('login').then((val) => {
      
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      let options = new RequestOptions({ headers: headers });
      
      let data = {
        login: val
      };
      
      this.http.post('http://www.frameworck.me/projetPhp/read_agents.php', data, options)
        .subscribe((res:any) => {
          console.log(res);
  
          this.datas = JSON.parse(res._body);
  
          console.log(this.datas);
          console.log("hello my name is black, the black");
        });


    });

  }

  myUpdate(matricule_agents) {
    this.navCtrl.setRoot('UpdateAgentsPage', {matricule_agents: matricule_agents});
  }

  myDelete(matricule_agents) {

    console.log(matricule_agents);

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    let options = new RequestOptions({ headers: headers });
    
    let data = {
      matricule_agents: matricule_agents
    };
    
    this.http.post('http://www.frameworck.me/projetPhp/delete_agent.php', data, options)
      .subscribe((res:any) => {
        console.log(res);

        this.getAgents();
        console.log("delete res");
        
        console.log(res);
        //this.datas = JSON.parse(res._body);
        //console.log(this.datas);

      });

  }

}
