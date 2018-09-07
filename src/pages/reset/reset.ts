import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

declare var firebase;
@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

  private todo : FormGroup;
  email;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,private toastCtrl: ToastController) {
    // this.todo = this.formBuilder.group({
    // email: ['', Validators.required],
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
  }


  reset(){
    var auth = firebase.auth();
    var emailAddress = this.email;
    console.log(emailAddress)
    auth.sendPasswordResetEmail(emailAddress).then((message)=> {
      // Email sent.
      const toast = this.toastCtrl.create({
        message: "Email was successfully sent to "+emailAddress,
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'middle'
      });
      toast.onDidDismiss(()=>{
        console.log('toast button cliked..')
        
      });
      toast.present();
   }).catch((error)=> {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message
      const toast = this.toastCtrl.create({
        message: errorMessage,
        showCloseButton: true,
        closeButtonText: 'Ok',
        position: 'middle'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present(); 
    });
  }


}
