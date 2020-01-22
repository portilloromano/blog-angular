import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss'],
  providers: [
    CategoryService]
})

export class PostCategoryComponent implements OnInit {
  public pageTitle: string;
  public category: Category;
  public posts: Post[];
  public url: string;
  public identity: string;
  public token: string;
  public category_id: number;

  constructor(
    private _categoryService: CategoryService,
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
    this.getCategoryById();
  }

  getCategoryById() {
    this._route.params.subscribe(
      params => {
        this.category_id = +params['id'];
        this._categoryService.getCategoryById(this.category_id).subscribe(
          res => {
            this.pageTitle = res.category.name;
          },
          error => {
            console.log(error);
            this._router.navigate(['/home']);
          }
        );
      });
  }
}
