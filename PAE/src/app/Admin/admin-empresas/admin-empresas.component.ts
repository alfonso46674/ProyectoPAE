import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-empresas',
  templateUrl: './admin-empresas.component.html',
  styleUrls: ['./admin-empresas.component.scss']
})
export class AdminEmpresasComponent implements OnInit {

  correoEmpresaEliminar;
  empresas;
  url = environment.url + '/api/empresas'

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res) => {
      // console.log(res);
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.empresas = Object.values(res);
      // console.log(this.ofertas);
    });
  }


  eliminarEmpresa(){
    this.http.delete(this.url + '/' + this.correoEmpresaEliminar).subscribe();
  }
}
