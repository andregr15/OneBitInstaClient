import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  public user: User;
  public userPhoto: string = "";

  private base64Content: string = "";
  private cameraConfig: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 250,
    targetHeight: 250,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams,
    private userProvider: UserProvider,
    private toast: ToastController,
    private camera: Camera
  ) {}

  ionViewWillEnter() {
    this.loadUser();
  }

  takePicture() {
    this.camera.getPicture(this.cameraConfig).then(
      base64 => {
        this.base64Content = base64;
        this.userPhoto = `data:image/jpeg;base64,${base64}`;
      }, 
      () => { }
    );
  }

  updateUser(form: NgForm) {
    let user = {
      name: form.value.name, 
      description: form.value.description, 
      email: form.value.email
    };

    if(this.base64Content) 
      user["photo_base64"] = this.base64Content;

    this.userProvider.update(user).then((response: any) => {
      this.navCtrl.push("HomePage");
      this.toast.create({
        message: "Profile updated successfully",
        duration: 3000,
      }).present();
    }, (response: any) => {
      this.toast.create({ message: "Error on update profile", duration: 2000 }).present()
    })
  }

  private loadUser() {
    this.userProvider.load(this.navParams.get('id'))
      .then(
        (user: User) => {
          this.user = user;
          this.userPhoto = user.photoUrl;
          console.log(this.userPhoto)
      })
  }

}
