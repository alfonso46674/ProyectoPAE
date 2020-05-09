import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header-no-logeado',
  templateUrl: './header-no-logeado.component.html',
  styleUrls: ['./header-no-logeado.component.scss']
})
export class HeaderNoLogeadoComponent implements OnInit {

  logueado = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logueado.subscribe((val => this.logueado = val));
  }

  logout(){
    this.authService.logout();
  }

}
