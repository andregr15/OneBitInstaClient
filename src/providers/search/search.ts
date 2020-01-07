import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { API_URL } from '../../constants';
import { PostFormatter } from '../post/post_formatter';
import { User } from '../../models/user';
import { Post } from '../../models/post';

@Injectable()
export class SearchProvider {

  constructor(public http: HttpClient, private auth: AuthProvider) { }

  async search(search: string) {
    const response: any = await this.http.get(
      `${API_URL}/api/v1/search?search=${search}`,
      { headers: this.auth.authHeader() }
    ).toPromise();

    return {
      users: this.formatUserList(response.users), 
      posts: this.formatPost(response.posts)
    };
  }

  private formatUserList(response: any): User[] {
    let users: User[] = [];
    response.data.forEach(
      user => users.push(this.formatUser(user))
    );
    return users;
  }

  private formatPost(response): Post[] {
    let posts: Post[] = [];
    for(let post of response.data) {
      const postFormatter = new PostFormatter(post, response.included);
      posts.push(postFormatter.call());
    }

    return posts;
  }

  private formatUser(response): User {
    const attr = response.attributes;
    return new User(
      response.id,
      attr.name,
      attr.email,
      attr.photo_url,
      attr.description,
      {
        followers: attr.followers_count,
        follwings: attr.follwings_count,
        isFollowing: attr.is_following,
        posts: attr.posts_count
      }
    );
  }
}
