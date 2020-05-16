import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuscarUsuarioService } from './buscar-usuario.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.scss']
})
export class BuscarUsuarioComponent implements OnInit {
  usuarios;
  filtrados;
  busqueda = '';
  src;
  order = {byExp : false, bySal : false, byDisp : false};
  url = environment.url +'/api/usuarios'

  // usuariosSubcription = new Subscription();

  constructor(private servicio: BuscarUsuarioService, private http: HttpClient) {
      
    // this.usuarios = this.servicio.getUsers();
    // this.servicio.usersSubject.subscribe((data) => {
    //   console.log(data);
    //   this.usuarios = data;
    // });
    // console.log(this.usuarios);
    // this.filtrados = this.usuarios.slice();
    // console.log(this.filtrados);
  }

    ngOnInit(): void{
      this.http.get(this.url).subscribe((res)=>{
        this.usuarios = res;
        this.filtrados = this.usuarios.slice();
      })
    }

  
  buscar() {
    this.filtrados = this.usuarios.filter(p => p.email.toUpperCase().includes(this.busqueda.toUpperCase())
                                          || p.nombre.toUpperCase().includes(this.busqueda.toUpperCase())
                                          || p.apellido.toUpperCase().includes(this.busqueda.toUpperCase())
                                          ||  p.carrera.toUpperCase().includes(this.busqueda.toUpperCase())
                                          || p.aniosExperiencia.toString().includes(this.busqueda)
                                          || p.titulacion.toUpperCase().includes(this.busqueda.toUpperCase())
                                          || p.salarioDeseado.toString().includes(this.busqueda));
    if (this.order.bySal) {
      this.ordenarSal();
    }

    if(this.ordenarExp){
      this.ordenarExp();
    }
  }

  disponibilidad(){
    if(this.order.byDisp){
      this.filtrados = this.usuarios.filter(p => p.estado == "Disponible");
    }else{
      this.buscar();
    }
    
  }


  ordenarSal() {
      if (this.order.bySal) {
        this.filtrados.sort((a, b) => a.salarioDeseado - b.salarioDeseado);
      } else {
        this.buscar();
      }
  }

  ordenarExp() {
    if (this.order.byExp) {
      this.filtrados.sort((a, b) => b.aniosExperiencia - a.aniosExperiencia);
    } else {
      this.buscar();
    }
}



}
