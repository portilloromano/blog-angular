import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    PostService,
    UserService
  ]
})

export class HomeComponent implements OnInit {
  public pageTitle: string;
  public posts: Post[];
  public url: string;
  public identity: string;
  public token: string;
  
  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) { 
    this.pageTitle = 'Inicio';
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {}
}
