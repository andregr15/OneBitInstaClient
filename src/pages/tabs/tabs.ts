import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  home: string = "HomePage";
  profile: string = "ProfilePage";
  post: string = "NewPostPage";
  search: string = "SearchPage";
  logout: string = "SignOutPage";
}
