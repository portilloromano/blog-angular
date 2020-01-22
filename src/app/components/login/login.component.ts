import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public message: string;
  public token: string;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.pageTitle = 'Identifícate';
    this.user = new User(0, '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      res => {
        this.status = res.status;
        this.message = res.message;
        this.token = res.token;
        if (this.status == 'success') {
          this._userService.signup(this.user, true).subscribe(
            res => {
              this.identity = res.identity;

              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this._router.navigate(['home']);
            },
            error => {
              this.status = error['error'].status;
              this.message = error['error'].message;
              console.log(error);
            }
          )
        }
      },
      error => {
        this.status = error['error'].status;
        this.message = error['error'].message;
        console.log(error);
      }
    )
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params['sure'];

      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        this._router.navigate(['home']);
      }
    });
  }
}
