import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  empresa;
  correoUsuarioLogeado = window.localStorage.getItem('usuarioActual')
  url = 'http://localhost:3000/api/empresas/'+ this.correoUsuarioLogeado;

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> this.empresa = res);
  }

}
