import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate():boolean {
    if(! this.authService.isLoggedIn()){ // si no esta logeado
      this.router.navigateByUrl('/');
      return false;
    }
    
    return true;
  }

}
