import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import moment from 'moment';  
import { TextToSpeech } from '@ionic-native/text-to-speech';
/**
 * Generated class for the SuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var firebase;
@IonicPage()
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage { 
  txtMessage:string;
  datetime:any; 
  reviewstats:number;
  suggestionList = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private textToSpeech: TextToSpeech) {
    //textToSpeech.speak("Welcome to text to speech API ")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuggestionPage'); 
    this.datetime = moment().format('MMMM Do YYYY - h:mm a');
    this.reviewstats = 0;
    firebase.database().ref("Suggestions/").on("value",(snapshot) =>{
      snapshot.forEach(element => {
        this.suggestionList.push({key:element.key, suggestionMsg: element.val().suggestionMsg, reviews: element.val().reviews, postedDateTime: element.val().postedDateTime})
         console.log(element.val().suggestionMsg)
       });
    })
  }
  PostSuggestion(){
    this.datetime = moment().format('MMMM Do YYYY - h:mm a');
    firebase.database().ref('Suggestions/').push({ suggestionMsg: this.txtMessage, reviews:0, postedDateTime:this.datetime})
    
  }
  reviews(suggestion){
     suggestion.reviews = suggestion.reviews + 1;
     this.suggestionList = [];
      firebase.database().ref('Suggestions/'+suggestion.key).update({ suggestionMsg: suggestion.suggestionMsg, reviews: suggestion.reviews, postedDateTime:suggestion.postedDateTime});
      
    }
    Speak(suggestion){
      this.textToSpeech.speak(suggestion.suggestionMsg)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    }
}
