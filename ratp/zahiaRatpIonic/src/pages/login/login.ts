import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { Headers, RequestOptions, Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login;
  public password;
  data: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    private storage: Storage
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  formRegister() {
    this.navCtrl.setRoot('RegisterPage'); 
  }

  SignIn() {
    // Vérifier que les champs login et mot de passe sont remplis
    if (! this.login) {
      let alert = this.alertCtrl.create({
          title: "Attention",
          subTitle: "Le champ compte matriculaire est vide",
          buttons: ['OK']
      });
      alert.present();

      } else
      if (! this.password) {
          let alert = this.alertCtrl.create({
          title: "Attention",
          subTitle: "Le champ mot de passe est vide",
          buttons: ['OK']
        });
          alert.present();

      }else {

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

        let options = new RequestOptions({ headers: headers });
        let data = {
          login: this.login,
          password: this.password
        };

        let loader = this.loading.create({
          content: 'En cours de traitement, veuillez patienter...',
        });
          loader.present().then(() => {
            
          this.http.post('http://www.frameworck.me/projetPhp/login.php', data, options)
            .subscribe((res:any) => {
             loader.dismiss();
              console.log(res);

              let data = JSON.parse(res._body);

              if (data.ok) {
                let alert = this.alertCtrl.create({
                    title: "Félicitations",
                    subTitle: "Votre connexion est reussie",
                    buttons: ['OK']
                });
                 alert.present();

                this.storage.set('login', this.login);
                
                this.navCtrl.setRoot('MenuPage'); 

              } else {
                let alert = this.alertCtrl.create({
                    title: "Erreur",
                    subTitle: "Votre 'compte matriculaire' ou 'mot de passe' est invalide",
                    buttons: ['OK']
                });
                alert.present();
              }
            });
        });
      }
  }

}
