import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { CategoriesChangesService } from '../../services/categories-changes.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
  providers: [
    CategoryService,
    UserService,
    CategoriesChangesService]
})
export class CategoryNewComponent implements OnInit {
  public pageTitle: string;
  public category: Category;
  public token: string;
  public status: string;
  public message: string;

  constructor(
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _categoriesChangesServices: CategoriesChangesService
  ) {
    this.pageTitle = 'Crear categoría';
    this.category = new Category(0, '', '', '');
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._categoryService.create(this.token, this.category).subscribe(
      res => {
        this.status = res.status;
        this.message = res.message;
        if (this.status == 'success') {
          form.reset();
          this._categoriesChangesServices.reloadCategoriesOnHeaderComponent();
        }
      },
      error => {
        this.status = error['error'].status;
        this.message = error['error'].message;
        console.log(error);
      }
    );
  }
}
