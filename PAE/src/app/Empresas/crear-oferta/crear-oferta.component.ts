import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.scss']
})
export class CrearOfertaComponent implements OnInit {
  datos = {};
  respuestaOferta = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm){

    this.datos = {
      emailUsuario : form.value.emailUsuario,
      emailEmpresa : window.sessionStorage.getItem('usuarioActual'),
      salario : form.value.salario,
      tiempoContratacion: form.value.tiempoContratacion
    };

    this.http.post(environment.url +'/api/ofertas', this.datos).subscribe((res)=>{
      // console.log(res)
      // console.log(typeof(res));
      this.respuestaOferta = res;
      console.log(this.respuestaOferta['status']);
    })


  }

}
