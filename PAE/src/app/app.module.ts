import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioMainComponent } from './Usuarios/usuario-main/usuario-main.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioMainComponent,
    LoginComponent,
    NotFoundComponent,
    OfertasComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
