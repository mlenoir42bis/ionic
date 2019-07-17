import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public matricule_REL;
  public nom_REL;
  public nom_site_REL;
  public email;
  public login;
  public password;
  data: string;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  formLogin() {
    this.navCtrl.setRoot('LoginPage'); 
  }
  addRegister() {
    //Vérifier que tous les champs sont bien remplis
    if (!this.matricule_REL) {
      let alert = this.alertCtrl.create({
        title: "Attention",
        subTitle: "Le champ matricule_rel est vide",
        buttons: ['OK']
      });
      alert.present();

    } else
      if (!this.nom_REL) {
        let alert = this.alertCtrl.create({
          title: "Attention",
          subTitle: "Le champ nom est vide",
          buttons: ['OK']
        });
        alert.present();

        } else
          if (!this.nom_site_REL) {
            let alert = this.alertCtrl.create({
              title: "Attention",
              subTitle: "Le champ le_site est vide",
              buttons: ['OK']
            });
            alert.present();

          } else
            if (!this.email) {
              let alert = this.alertCtrl.create({
                title: "Attention",
                subTitle: "Le champ email est vide",
                buttons: ['OK']
              });
              alert.present();

            } else
              if (!this.login) {
                let alert = this.alertCtrl.create({
                  title: "Attention",
                  subTitle: "Le champ login est vide",
                  buttons: ['OK']
                });
                alert.present();

              } else
                if (!this.password) {
                  let alert = this.alertCtrl.create({
                    title: "Attention",
                    subTitle: "Le champ Password est vide",
                    buttons: ['OK']
                  });
                  alert.present();
                }

                else {
                  var headers = new Headers();
                  headers.append("Accept", 'application/json');
                  headers.append('Content-Type', 'application/json');
                  headers.append("Access-Control-Allow-Origin", "*");
                  headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
                  headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

                  let options = new RequestOptions({ headers: headers });
                  let data = {
                    matricule_REL: this.matricule_REL,
                    nom_REL: this.nom_REL,
                    nom_site_REL: this.nom_site_REL,
                    email: this.email,
                    login: this.login,
                    password: this.password,
                  };
                  let loader = this.loading.create({
                    content: 'En cours de traitement, veuillez patienter...',
                  });
                  loader.present().then(() => {

                    this.http.post('http://www.frameworck.me/projetPhp/register.php', data, options)
                      .subscribe((res: any) => {
                        loader.dismiss()
                        console.log(res);

                        let data = JSON.stringify(res._body);

                        if (res.ok) {
                          let alert = this.alertCtrl.create({
                            title: "Félicitations",
                            subTitle: "Votre inscription est réussie",
                            buttons: ['OK']
                          });
                          alert.present();
                          this.navCtrl.setRoot('LoginPage'); 
                        } 
                        else {
                          let alert = this.alertCtrl.create({
                            title: "Erreur",
                            subTitle: "Votre inscription a échouée veuillez recommencer",
                            buttons: ['OK']
                          });
                          alert.present();
                        }
                      });
                  });
                }
  }

}
