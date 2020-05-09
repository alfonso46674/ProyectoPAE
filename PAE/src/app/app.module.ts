import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNoLogeadoComponent } from './header-no-logeado/header-no-logeado.component';
import { UsuarioMainComponent } from './Usuarios/usuario-main/usuario-main.component';
import { HomeNoLogeadoComponent } from './home-no-logeado/home-no-logeado.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNoLogeadoComponent,
    UsuarioMainComponent,
    HomeNoLogeadoComponent,
    LoginComponent,
    NotFoundComponent,
    OfertasComponent
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
