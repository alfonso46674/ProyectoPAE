import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CrearOfertaComponent } from './Empresas/crear-oferta/crear-oferta.component';
import { OfertasActualesComponent } from './Empresas/ofertas-actuales/ofertas-actuales.component';
import { PerfilEmpresaComponent } from './Empresas/perfil-empresa/perfil-empresa.component';
import { PerfilUsuarioComponent } from './Usuarios/perfil-usuario/perfil-usuario.component';
import { AdminOfertasComponent } from './Admin/admin-ofertas/admin-ofertas.component';
import { AdminUsuariosComponent } from './Admin/admin-usuarios/admin-usuarios.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { BuscarUsuarioComponent } from './Empresas/buscar-usuario/buscar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    OfertasComponent,
    HomeComponent,
    HeaderComponent,
    CrearOfertaComponent,
    OfertasActualesComponent,
    PerfilEmpresaComponent,
    PerfilUsuarioComponent,
    AdminOfertasComponent,
    AdminUsuariosComponent,
    RegistroUsuarioComponent,
    RegistroEmpresaComponent,
    BuscarUsuarioComponent,
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
