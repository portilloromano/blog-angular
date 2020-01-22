import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public identity: string;
  public token: string;
  public status: string;
  public message: string;
  public url: string;
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
      url: global.url + 'user/upload',
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
      attachPinBtn: 'Sube tu avatar',
      afterUploadMsg_success: 'La subida se ha completado!',
      afterUploadMsg_error: 'La subida ha fallado!'
    }
  };

  constructor(
    private _userService: UserService
  ) {
    this.pageTitle = 'Ajustes de usuario';
    this.user = new User(0, '', '', '', '', '', '', '', '', '');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this._userService.getUserById(+this.identity.sub).subscribe(
      res => {
        this.user = res['user'];
      },
      error => {
        console.log(error);
      }
    );
  }

  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      res => {
        this.status = res['status'];
        this.message = res['message'];
        if (this.status == 'success') {
          this.identity['name'] = this.user.name;
          this.identity['surname'] = this.user.surname;
          this.identity['email'] = this.user.email;
          this.identity['image'] = this.user.image;
          localStorage.setItem('identity', JSON.stringify(this.identity));
        }
      },
      error => {
        this.status = error['error'].status;
        this.message = error['error'].message;
        console.log(error['error']);
      }
    );
  }

  avatarUpload(data) {
    let imageData = JSON.parse(data.response);
    this.user.image = imageData.image;
  }
}
