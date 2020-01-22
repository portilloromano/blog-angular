import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'; 
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public pageTitle: string;
  public user: User;
  public status: string;
  public message: string;

  constructor(
    private _userService: UserService
  ) { 
    this.pageTitle = 'Regístrate';
    this.user = new User(0, '', '', 'ROLE_USER', '', '', '', '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form){
    this._userService.register(this.user).subscribe(
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
}