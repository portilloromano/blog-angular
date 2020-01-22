import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [
    CategoryService,
    UserService
  ]
})
export class CategoryListComponent implements OnInit {
  public pageTitle: string;
  public categories: Category[];
  public token: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.pageTitle = 'Categorías';
    this.token = _userService.token;
   }

  ngOnInit() {
    this.getCategories();
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

  deleteCategory(id: number) {
    this._categoryService.delete(this.token, id).subscribe(
      res => {
        this.getCategories();
      },
      error => {
        console.log(error);
      }
    )
  }
}
