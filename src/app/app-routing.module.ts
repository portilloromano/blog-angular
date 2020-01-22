import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndentityGuardService } from './services/indentity-guard.service';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { CategoryNewComponent } from './components/category-new/category-new.component';
import { PostNewComponent } from './components/post-new/post-new.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout/:sure', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'settings', component: UserEditComponent, canActivate: [IndentityGuardService]},
  {path: 'category', component: CategoryListComponent, canActivate: [IndentityGuardService]},
  {path: 'category/create', component: CategoryNewComponent, canActivate: [IndentityGuardService]},
  {path: 'category/edit/:id', component: CategoryEditComponent, canActivate: [IndentityGuardService]},
  {path: 'post/create', component: PostNewComponent, canActivate: [IndentityGuardService]},
  {path: 'post/:id', component: PostDetailComponent},
  {path: 'post/edit/:id', component: PostEditComponent},
  {path: 'post/category/:id', component: PostCategoryComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
