import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { NavController } from 'ionic-angular';
import {CreateUser} from '../../providers/create-user';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [CreateUser]
})
export class RegisterPage {
  myForm =null;
params:any;
private myData: any;
  constructor(public createuser: CreateUser,public navCtrl: NavController,public builder: FormBuilder) {
    this.myForm = builder.group({
    'username': ['', Validators.required],
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'email': ['', Validators.required],
    'mobile': ['', Validators.required],
    'password': ['', Validators.required],
      'cnfpassword': ['', Validators.required]

    });
  }
  onSubmit(formData){
  console.log('Form data is',formData.username);
  this.params="username="+ formData.username+"&firstname="+formData.firstname+"&lastname="+formData.lastname+"&lastname="+formData.lastname+"&email="+formData.email+"&mobile="+formData.mobile+"&pwd="+formData.password;
  this.createuser.load(this.params)
      .then(data => {
        this.myData = data;
   console.log('Form data is',  this.myData );

      });
  }
}
