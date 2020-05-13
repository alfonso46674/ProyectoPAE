import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';
import { AuthGuardServiceUser} from './auth-guard-usuario.service';
import { HomeComponent } from './home/home.component';
import { PerfilUsuarioComponent } from './Usuarios/perfil-usuario/perfil-usuario.component';
import { AuthGuardServiceCompany } from './auth-guard-empresa.service';
import { CrearOfertaComponent } from './Empresas/crear-oferta/crear-oferta.component';
import { OfertasActualesComponent } from './Empresas/ofertas-actuales/ofertas-actuales.component';
import { PerfilEmpresaComponent } from './Empresas/perfil-empresa/perfil-empresa.component';
import { AuthGuardServiceAdmin } from './auth-guard-admin.service';
import { AdminOfertasComponent } from './Admin/admin-ofertas/admin-ofertas.component';
import { AdminUsuariosComponent } from './Admin/admin-usuarios/admin-usuarios.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { RegistroEmpresaComponent } from './registro-empresa/registro-empresa.component';
import { BuscarUsuarioComponent } from './Empresas/buscar-usuario/buscar-usuario.component';



const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  // registro y login
  {path:'login', component: LoginComponent},
  {path:'registroUsuario', component: RegistroUsuarioComponent},
  {path:'registroEmpresa', component: RegistroEmpresaComponent},
  

  // verificar rutas para usuarios
  {path:'usuario', canActivate: [AuthGuardServiceUser], // se limita el acceso a usuarios autorizados
    children:[
      {path: 'ofertas', component: OfertasComponent},
      {path: 'perfil', component: PerfilUsuarioComponent},
      {path: '**', component: NotFoundComponent}
    ]},

    // verificar rutas para empresa
    {path:'empresa', canActivate: [AuthGuardServiceCompany],
        children: [
          {path: 'crearOferta', component: CrearOfertaComponent},
          {path: 'ofertas', component: OfertasActualesComponent},
          {path: 'perfil', component: PerfilEmpresaComponent},
          {path: 'busqueda', component: BuscarUsuarioComponent},
          {path: '**', component: NotFoundComponent}
        ]},

        // verificar rutas para administrador
    {path:'admin', canActivate: [AuthGuardServiceAdmin],
        children: [
          {path: 'ofertas', component: AdminOfertasComponent},
          {path: 'usuarios', component: AdminUsuariosComponent},
          {path: '**', component: NotFoundComponent}
        ]},

  {path:'google/redirect', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
