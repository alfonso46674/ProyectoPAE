import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeNoLogeadoComponent } from './home-no-logeado/home-no-logeado.component';
import { LoginComponent } from './Usuarios/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  
  {path: 'home', component: HomeNoLogeadoComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path:'usuario/login', component: LoginComponent},
  {path:'usuario/ofertas', component: OfertasComponent, canActivate: [AuthGuardService]}, // se limita el acceso a usuario autorizados

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
