import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.scss']
})
export class EditarEmpresaComponent implements OnInit {
  empresa;
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = environment.url +'/api/empresas/'+ this.correoUsuarioLogeado;
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> this.empresa = res);
  }


  submit(form: NgForm){
    // console.log(form.value);
    // console.log(this.url);
    this.http.put(this.url, form.value).subscribe((res=>console.log(res)))
    this.router.navigateByUrl('/empresa/perfil')

  }
}
