import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-ofertas',
  templateUrl: './admin-ofertas.component.html',
  styleUrls: ['./admin-ofertas.component.scss']
})
export class AdminOfertasComponent implements OnInit {

  constructor(private http: HttpClient) { }
  correoEmpresaEliminar;
  correoUsuarioEliminar;
  ofertas; // arreglo de las ofertas
  
  url = environment.url +'/api/ofertas'


  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> {
      // console.log(res);
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.ofertas = Object.values(res);
      // console.log(this.ofertas);
    });
  }


  eliminarOferta(){
    this.http.delete(this.url + '/' + this.correoEmpresaEliminar + '/' + this.correoUsuarioEliminar).subscribe();
  }
}
