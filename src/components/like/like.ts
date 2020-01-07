import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: 'like.html'
})
export class LikeComponent {

  @Input() likeCount: number = 0;
  @Input() isLiked: boolean = false;

  @Output() public onLike = new EventEmitter();
  @Output() public onUnlike = new EventEmitter();

  like() {
    this.onLike.emit();
  }

  unlike() {
    this.onUnlike.emit();
  }

}
