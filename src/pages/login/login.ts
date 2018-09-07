import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserObj } from '../../models/loggedInUser.mock';

declare var firebase;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private todo : FormGroup;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder) {
    
    this.todo = this.formBuilder.group({
      email: ['',Validators.compose([ Validators.pattern('^[a-zA-Z_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$'),Validators.required])],
      password: ['',Validators.compose([ Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.minLength(6),Validators.maxLength(12),Validators.required])],

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.closeMenu();
  }
  closeMenu() {
    this.menuCtrl.enable(false, 'myMenu');
  }


  
  LogIn(){

    
    firebase.auth().signInWithEmailAndPassword(this.todo.value.email, this.todo.value.password).then(user=>{
      console.log("works");
      firebase.database().ref("/comm/").on('value', (snapshot) =>{
        snapshot.forEach((snap) =>{
          if(user.user.uid == snap.key){
            if(snap.val().role == 'Admin'){
              UserObj.push({role: snap.val().role});
              
              this.navCtrl.setRoot(HomePage);
            }else if(snap.val().role == 'user'){
              UserObj.push({role: snap.val().role});
              
              this.navCtrl.setRoot(HomePage);
            }
          }
          
        })
        //return isfound;
      })
     
    }

    ).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log("does not work")
    });
    

}
}
