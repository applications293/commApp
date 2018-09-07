
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { EventDetailsPage } from '../event-details/event-details';

/**
 * Generated class for the ViewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var firebase;

@IonicPage()
@Component({
  selector: 'page-view-event',
  templateUrl: 'view-event.html',
})
export class ViewEventPage {
  eventsList = [];
  categoryList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController) {
    
  }

  ionViewDidLoad() {
    this.getDataFromDB();
    console.log('ionViewDidLoad ViewEventPage');
  }
  addEvent(){
    this.navCtrl.push("AddEventPage");
  }

  getDataFromDB(){
    firebase.database().ref('/Events/').on('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Initializing Item;
        /*this.item._key = snap.key;
        this.item.name = snap.val().c_itemName;*/
        //Adding Item to itemsList
        this.eventsList.push({_key : snap.key, EventCategory: snap.val().EventCategory, EventDate: snap.val().EventDate, EventName : snap.val().EventName, EventTime: snap.val().EventTime, downloadUrl: snap.val().downloadUrl});
       console.log(snap.val().downloadUrl);
       console.log(this.eventsList);
        return false;
      });
      this.categoryList = this.eventsList;
    });
    console.log(this.eventsList);
  }

  /*search(caterory){

    firebase.database().ref('/fireuploads/').on('value', (snapshot) =>
    {
      snapshot.forEach((snap) => 
      { 
        //Initializing Item;
        /*this.item._key = snap.key;
        this.item.name = snap.val().c_itemName;
        //Adding Item to itemsList
        this.eventsList.push({_key : snap.key, EventCategory: snap.val().EventCategory, EventDate: snap.val().EventDate, EventName : snap.val().EventName, EventTime: snap.val().EventTime, downloadUrl: snap.val().downloadUrl});
       console.log(snap.val().downloadUrl);
        return false;
      });
    });
    console.log("Im here")
   
  }*/

  /*presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(HomePopoverComponent);
    popover.present({
      //ev: myEvent
    });

    popover.onDidDismiss(popoverData =>{
       if(popoverData.name == 'Seminars and Conferences'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'sc'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Trade Shows'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'ts'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Executive Retreats and Incentive Programs'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'ei'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Appreciation Events'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'ae'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Sport Events'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'se'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Product Launch Events'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'pe'){
            this.categoryList.push(event);
            
          }
        }
      }else if(popoverData.name == 'Entertainment Events'){
        this.categoryList = [];
    
        for (let event of this.eventsList) {
          if(event.EventCategory == 'ee'){
            this.categoryList.push(event);
            
          }
        }
      }
      
    });
    
  }*/
  eventDetails(event:any){

    console.log(event.EventCategory)
    
    this.navCtrl.push(EventDetailsPage,{event:event});
  }


}
