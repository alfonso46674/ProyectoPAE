import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logueado = false;
  tipoUsuario = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logueado.subscribe((val => this.logueado = val));
    this.authService.tipoUsuario.subscribe((val => this.tipoUsuario = val));
  }

  logout(){
    this.authService.logout();
  }

}
