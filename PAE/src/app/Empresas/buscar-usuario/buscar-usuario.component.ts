import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.scss']
})
export class BuscarUsuarioComponent implements OnInit {
  usuarios: Usuario[];
  filtrados: Usuario[];
  busqueda = '';
  src;
  order = {byExp : false, bySal : false};
  constructor() {
    this.usuarios = [new Usuario(1234, 'Isaac', 'Gauna', 'isaac@gmail.com', 'Gerente', 15, 'Disponible', 'NiceToMeetYou', 'Ingenieria en Sistemas', 2, 'Licenciatura', 19500),
                     new Usuario(1567, 'Juan', 'Ramos', 'juan@gmail.com', 'Trabajador', 7, 'Disponble', 'NiceToMeetYouToo', 'Ingenieria en redes', 4, 'Maestria', 23000),
                     new Usuario(4500, 'Gabriela', 'Galvan', 'gaby@gmail.com', 'Trabajador', 11, 'Disponible', 'IncludeMePls', 'Ingenieria en Sistemas', 4, 'Maestria', 21000)];
    this.filtrados = this.usuarios.slice();
  }

  ngOnInit(): void {
  }


  buscar() {
    this.filtrados = this.usuarios.filter(p => p.carrera.toUpperCase().includes(this.busqueda.toUpperCase())
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

  ordenarSal() {
      if (this.order.bySal) {
        this.filtrados.sort((a, b) => a.salarioDeseado - b.salarioDeseado);
      } else {
        this.buscar();
      }
  }

  ordenarExp() {
    if (this.order.byExp) {
      this.filtrados.sort((a, b) => a.aniosExperiencia + b.aniosExperiencia);
    } else {
      this.buscar();
    }
}
}
