import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceCompany implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}



  canActivate():boolean {
    if(! this.authService.isLoggedIn()){ // si no esta logeado
      this.router.navigateByUrl('/');
      return false;
    }else{

      if(sessionStorage.getItem('tipoUsuario') === 'Empresa'){
        // console.log(localStorage.getItem('tipoUsuario'));
        return true;
      }
    }
    this.router.navigateByUrl('/');
    return false;
  }

}