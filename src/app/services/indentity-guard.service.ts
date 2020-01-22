import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class IndentityGuardService implements CanActivate {
  constructor(
    private _router: Router,
    private _userServie: UserService
  ) { }

  canActivate() {
    let identity = this._userServie.getIdentity();

    if (identity) {
      return true;
    } else {
      this._router.navigate(['/error']);
      return false;
    }
  }
}
