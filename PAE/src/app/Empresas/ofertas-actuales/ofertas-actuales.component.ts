import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ofertas-actuales',
  templateUrl: './ofertas-actuales.component.html',
  styleUrls: ['./ofertas-actuales.component.scss']
})
export class OfertasActualesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ofertas; // arreglo de las ofertas
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = environment.url +'/api/ofertas/dif/empresa/'+ this.correoUsuarioLogeado;


  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> {
      // console.log(res);
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.ofertas = Object.values(res);
      // console.log(this.ofertas);
    });
  }

}
