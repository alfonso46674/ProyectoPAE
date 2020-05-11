import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logueado = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logueado.subscribe((val => this.logueado = val));
  }

  logout(){
    this.authService.logout();
  }

}
