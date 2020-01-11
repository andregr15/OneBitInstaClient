import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { PostListComponent } from './post-list/post-list';
import { ProfileComponent } from './profile/profile';
import { FollowingComponent } from './following/following';
import { LikeComponent } from './like/like';
import { UserPhotoComponent } from './user-photo/user-photo';

@NgModule({
	declarations: [HeaderComponent,
    PostListComponent,
    ProfileComponent,
    FollowingComponent,
    LikeComponent,
    UserPhotoComponent],
	imports: [IonicModule],
	exports: [HeaderComponent,
    PostListComponent,
    ProfileComponent,
    FollowingComponent,
    LikeComponent,
    UserPhotoComponent]
})
export class ComponentsModule {}
