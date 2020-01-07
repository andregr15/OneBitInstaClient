import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {

  currentItem: string = "followers";
  followers: User[] = [];
  followings: User[] = [];
  user: User;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userProvider: UserProvider
  ) {}

  ionViewWillEnter() {
    this.user = this.navParams.get('user');
    this.loadFollows();
  }

  goToUserPage(user: User) {
    this.navCtrl.push('user-page', { id: user.id });
  }

  private loadFollows() {
    this.userProvider.loadFollows(this.user)
      .then(response => {
        this.followers = response.followers;
        this.followings = response.followings;
      });
  }

}
