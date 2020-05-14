import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io'

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
import { EditarUsuarioComponent } from './Usuarios/editar-usuario/editar-usuario.component';
import { EditarEmpresaComponent } from './Empresas/editar-empresa/editar-empresa.component';
import { EditarOfertaComponent } from './Empresas/editar-oferta/editar-oferta.component';
import { VerCompetenciaComponent } from './Empresas/ver-competencia/ver-competencia.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {url: environment.url, options: {}};

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
    EditarUsuarioComponent,
    EditarEmpresaComponent,
    EditarOfertaComponent,
    VerCompetenciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
