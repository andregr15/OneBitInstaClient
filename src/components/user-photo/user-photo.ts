import { Component, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'user-photo',
  templateUrl: 'user-photo.html'
})
export class UserPhotoComponent {
  @Input() user: User;
  @Input() userPhoto: string = "";
}
