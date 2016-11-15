import { Component } from '@angular/core';
import { AlertController,ToastController } from 'ionic-angular';
import { NavController , MenuController} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';
import {LoginService} from '../../providers/login-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
myForm =null;
public menu :any;
 public emailid: Array<Object>;
// myForm:FormGroup;
private myData: any;
params:any;
  constructor(public loginService: LoginService,public toastCtrl: ToastController,public alertCtrl: AlertController,public navCtrl: NavController,public builder: FormBuilder,public menuCtrl: MenuController ) {
 this.emailid = [];
 this.menuCtrl.close();
this.menuCtrl.enable(false,"mymenu");

this.myForm = builder.group({
'username': ['', Validators.required],
'password': ['', Validators.required]

});

  }

  register(){
  this.navCtrl.push(RegisterPage);

  }
  forgotpwd(){
    let prompt = this.alertCtrl.create({
      title: 'Forgot Password',
      message: "Enter your email id to reset password ",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            this.emailid.push({
                           name: data.email

                       });
          }
        }
      ]
    });
    prompt.present();
  }
onSubmit(formData){
console.log('Form data is',formData.username);
this.params="username="+ formData.username+"&pwd="+formData.password;
this.loginService.load(this.params)
    .then(data => {
      this.myData = data;
 console.log('Form data is',  this.myData );


    if(this.myData.status!="Fail"){
      let toast = this.toastCtrl.create({
           message: this.myData.msg,
           duration: 3000
         });
         toast.present();
 this.navCtrl.push(HomePage);
  }
  else{

    let toast = this.toastCtrl.create({
         message: this.myData.msg,
         duration: 3000
       });
       toast.present();
  }
    });
}



}
