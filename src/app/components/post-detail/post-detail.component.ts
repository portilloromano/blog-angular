import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [
    PostService,
  ]
})

export class PostDetailComponent implements OnInit {
  public pageTitle: string;
  public post: Post;
  public url: string;
  public identity: string;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.pageTitle = 'Inicio';
    this.url = global.url;
  }

  ngOnInit() {
    this.getPostById();
  }

  getPostById() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._postService.getPostById(id).subscribe(
          res => {
            this.post = res.post;
          },
          error => {
            console.log(error);
            this._router.navigate(['/home']);
          }
        );
      }
    );
  }
}
