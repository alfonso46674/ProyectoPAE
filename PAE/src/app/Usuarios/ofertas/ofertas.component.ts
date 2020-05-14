import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  ofertas; // arreglo de las ofertas
  correoUsuarioLogeado = window.localStorage.getItem('usuarioActual')
  url = 'http://localhost:3000/api/ofertas/dif/usuario/'+ this.correoUsuarioLogeado;

  ngOnInit(): void {

    this.http.get(this.url).subscribe((res)=> {
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.ofertas = Object.values(res);

      console.log(this.ofertas);
    });

  }

  // refrescarDatos(){
    // this.http.get(this.url).subscribe((res)=> {
    //   // console.log(res)
    //   this.ofertas = res;
    // })
    // console.log(this.ofertas);
  // }

}
