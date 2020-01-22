import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { Category } from '../../models/category';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.scss'],
  providers: [
    PostService,
    CategoryService,
    UserService]
})
export class PostNewComponent implements OnInit {
  public pageTitle: string;
  public post: Post;
  public categories: Category[];
  public token: string;
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
    private _userService: UserService
  ) {
    this.pageTitle = 'Crear post';
    this.token = this._userService.getToken();
    this.url = global.url;
    this.post = new Post(0, 0, 1, '', '', '', '', '');
    this.comment = "Crea un nuevo post. "
  }

  ngOnInit() {
    this.getCategories();
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      res => {
        this.status = res.status;
        this.message = res.message;
        if (this.status == 'success') {
          form.reset();
        } 
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
}
