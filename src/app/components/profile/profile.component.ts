import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [
    PostService,
    UserService
  ]
})
export class ProfileComponent implements OnInit {
  public posts: Post[];
  public url: string;
  public identity: string;
  public token: string;
  public user: User;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._userService.getUserById(id).subscribe(
          res => {
            this.user = res.user;
          },
          error => {
            console.log(error);
            this._router.navigate(['/home']);
          }
        )
      });
  }
}
