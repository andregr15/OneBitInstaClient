import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { API_URL } from '../../constants';
import { User } from '../../models/user';

@Injectable()
export class UserProvider {

  constructor(private http: HttpClient, private auth: AuthProvider) {}

  async load(userId) {
    const response: any = await this.http.get(
      `${API_URL}/api/v1/users/${userId}`,
      { headers: this.auth.authHeader() }
    ).toPromise();

    return this.formatResponse(response);
  }

  async update(user: any) {
    const response: any = await this.http.put(
      `${API_URL}/api/v1/users/${this.auth.currentUser.id}`,
      { user },
      { headers: this.auth.authHeader() }
    ).toPromise();

    return response;
  }

  async follow(user: User) {
    return await this.http.post(
      `${API_URL}/api/v1/users/${user.id}/followings`,
      {},
      { headers: this.auth.authHeader() }
    ).toPromise();
  }

  async unfollow(user: User) {
    return await this.http.delete(
      `${API_URL}/api/v1/users/${user.id}/followings`,
      { headers: this.auth.authHeader() }
    ).toPromise();
  }

  async loadFollows(user: User) {
    const response: any = await this.http.get(
      `${API_URL}/api/v1/users/${user.id}/followings`,
      { headers: this.auth.authHeader() }
    ).toPromise();

    return {
      followers: this.formatUsersList(response.followers),
      followings: this.formatUsersList(response.followings)
    }
  }

  private formatUsersList(data: any): User[] {
    let users: User[] = [];
    data.data.forEach(
      user => users.push(this.formatUser(user))
    )
    return users;
  }

  private formatResponse(response: any): User {
    return this.formatUser(response.data);
  }

  private formatUser(data) {
    const attr = data.attributes;
    return new User(
      data.id,
      attr.name,
      attr.email,
      attr.photo_url,
      attr.description,
      {
        followers: attr.followers_count,
        followings: attr.followings_count,
        isFollowing: attr.is_following,
        posts: attr.posts_count
      }
    );
  }
}
