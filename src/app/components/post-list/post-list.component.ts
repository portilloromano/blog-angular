import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [UserService,
    PostService]
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() token;
  @Input() url;
  @Input() type;

  public isAdmin: boolean;

  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.isAdmin = false;
  }

  ngOnInit() {
    this.loadPosts();
    this.verifyIsAdmin();
  }

  verifyIsAdmin() {
    if (this.identity != null) {
      this._userService.getUserById(+this.identity.sub).subscribe(
        res => {
          this.isAdmin = res['user'].role == 'ROLE_ADMIN' ? true : false;
        },
        error => {
          console.log(error);
        });
    }
  }

  loadPosts() {
    switch (this.type) {
      case 'home':
        this.getPosts();
        break;
      case 'category':
        this.getPostsByCategory();
        break;
      case 'profile':
        this.getPostsByUserId();
        break;
    }
  }

  getPosts() {
    this._postService.getPosts().subscribe(
      res => {
        this.posts = res.posts;
      },
      error => {
        console.log(error);
      }
    )
  }

  getPostsByCategory() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._postService.getPostsByCategoryId(id).subscribe(
          res => {
            this.posts = res.posts;
          },
          error => {
            console.log(error);
          }
        )
      });
  }

  getPostsByUserId() {
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._postService.getPostsByUserId(id).subscribe(
          res => {
            this.posts = res.posts;
          },
          error => {
            console.log(error);
            this._router.navigate(['/home']);
          });
      });
  }

  deletePost(id: number) {
    this._postService.delete(this.token, id).subscribe(
      res => {
        this.loadPosts();
      },
      error => {
        console.log(error);
      }
    )
  }
}
