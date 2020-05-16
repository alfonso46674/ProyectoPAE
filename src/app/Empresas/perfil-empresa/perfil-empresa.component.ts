import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.scss']
})
export class PerfilEmpresaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  empresa;
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = environment.url +'/api/empresas/'+ this.correoUsuarioLogeado;

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> this.empresa = res);
  }

}
