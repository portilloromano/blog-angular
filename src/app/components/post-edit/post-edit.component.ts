import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  styleUrls: ['../post-new/post-new.component.scss'],
  providers: [
    PostService,
    CategoryService,
    UserService]
})

export class PostEditComponent implements OnInit {
  public pageTitle: string;
  public post: Post;
  public categories: Category[];
  public token: string;
  public identity: string;
  public status: string;
  public message: string;
  public url: string;
  public comment:string;
  public froala_options: Object = {
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'post/upload',
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Selecciona una imagen',
      resetBtn: 'Reset',
      uploadBtn: 'Subir',
      attachPinBtn: 'Subir imagen',
      afterUploadMsg_success: 'La subida se ha completado!',
      afterUploadMsg_error: 'La subida ha fallado!'
    }
  };

  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.pageTitle = 'Editar post';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = global.url;
    this.comment = "Edita el post."
   }

  ngOnInit() {
    this.getCategories();
    this.getPostById();
  }

  onSubmit(form){
    delete this.post['category'];
    delete this.post['user'];

    this._postService.update(this.token, this.post, this.post.id).subscribe(
      res => {
        this.status = res.status;
        this.message = res.message;
      },
      error => {
        this.status = error['error'].status;
        this.message = error['error'].message;
        console.log(error);
      }
    );
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      res => {
        this.categories = res.categories;
      },
      error => {
        console.log(error);
      }
    )
  }

  imageUpload(data) {
    let imageData = JSON.parse(data.response);
    this.post.image = imageData.image;
  }

  getPostById(){
    this._route.params.subscribe(
      params => {
        let id = +params['id'];
        this._postService.getPostById(id).subscribe(
          res => {
            this.post = res.post;
            if(this.post.user_id != +this.identity.sub){
              this._router.navigate(['/home']);
            }
          },
          error =>{
            console.log(error);
            this._router.navigate(['/home']);
          }
        );
      }
    );
  }
}
