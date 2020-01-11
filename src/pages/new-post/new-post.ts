import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { PostProvider } from '../../providers/post/post';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {

  public user: User;
  public postPhoto: string = "";

  private base64Content: string = "";
  private cameraConfig: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  constructor(
    private userProvider: UserProvider,
    private postProvider: PostProvider,
    private authProvider: AuthProvider,
    private camera: Camera,
    private navCtrl: NavController,
    private toast: ToastController
  ) {}

  ionViewWillEnter() {
    this.loadUser();
  }

  takePicture() {
    this.camera.getPicture(this.cameraConfig).then(
      base64 => {
        this.base64Content = base64;
        this.postPhoto = `data:image/jpeg;base64,${base64}`;
      }, 
      () => {}
    );
  }

  createPost(form: NgForm) {
    this.postProvider.create(
      this.base64Content, form.value.description
    ).then((response: any) => {
        this.navCtrl.parent.select(0);
        this.toast.create({
          message: "Post created successfully",
          duration: 3000,
        }).present();
      }, (response: any) => {
        response.error.errors.forEach(
          error => this.toast.create({ message: error, duration: 2000}).present()
        );
      }
    )
  }

  private loadUser() {
    this.userProvider.load(this.authProvider.currentUser.id)
      .then(
        (user: User) => this.user = user
      );
  }

}
