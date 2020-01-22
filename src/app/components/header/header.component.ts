import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { CategoriesChangesService } from '../../services/categories-changes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [
    UserService,
    CategoryService,
    CategoriesChangesService]
})
export class HeaderComponent implements OnInit, DoCheck {
  public identity: string;
  public token: string;
  public url;
  public categories: Category[];
  public isAdmin: boolean;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _categoriesChangesServices: CategoriesChangesService
  ) {
    this.isAdmin = false;
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit() {
    this.getCategories();
    this._categoriesChangesServices.ivokeHeaderComponentFunction.subscribe(() => {
      console.log("header");
      this.getCategories();
    },
      error => {
        console.log(error);
      },
      complete => {
        console.log("Complete");
      }
    );
  }

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    let oldIdentityEmail = this.identity ? this.identity['email'] : null;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    if (this.identity) {
      if (oldIdentityEmail == null || (oldIdentityEmail != this.identity['email'])) {
        this.verifyIsAdmin();
      }
    }
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      res => {
        this.categories = res.categories;
      },
      error => {
        console.log(error);
      }
    )
  }

  verifyIsAdmin() {
    this._userService.getUserById(+this.identity.sub).subscribe(
      res => {
        this.isAdmin = res['user'].role == 'ROLE_ADMIN' ? true : false;
      },
      error => {
        console.log(error);
      });
  }
}
