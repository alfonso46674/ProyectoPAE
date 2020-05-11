import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Usuarios/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OfertasComponent } from './Usuarios/ofertas/ofertas.component';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path:'usuario/login', component: LoginComponent},
  {path:'usuario/ofertas', component: OfertasComponent, canActivate: [AuthGuardService]}, // se limita el acceso a usuario autorizados
  {path:'google/redirect', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
