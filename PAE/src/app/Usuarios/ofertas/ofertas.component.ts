import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  
  ofertas; // arreglo de las ofertas
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = environment.url + '/api/ofertas/dif/usuario/'+ this.correoUsuarioLogeado;

  ngOnInit(): void {

    this.http.get(this.url).subscribe((res)=> {
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.ofertas = Object.values(res);

      console.log(this.ofertas);
    });

  }

  seleccionarOferta(event){
    

    // actualizar estado del usuario a No Disponible
    this.http.put(environment.url + '/api/usuarios/' + this.correoUsuarioLogeado, {estado: "No Disponible"}).subscribe();


    // actualizar estado de la ofertas del usuario a No Aceptada
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.ofertas.length; i++){
      console.log(this.ofertas[i].emailEmpresa);
      this.http.put(environment.url + '/api/ofertas/'+this.ofertas[i].emailEmpresa + '/' + this.correoUsuarioLogeado, 
      {estado: 'No Aceptada'})
      .subscribe((res)=> console.log(res))
    }


    // actualizar estado de la oferta seleccionada a Aceptada

    let correoEmpresa = event.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.data;
    this.http.put(environment.url +'/api/ofertas/'+correoEmpresa+'/'+this.correoUsuarioLogeado,{estado: "Aceptada"})
    .subscribe((res) => console.log(res));


    this.router.navigateByUrl('/home')
  }

  // refrescarDatos(){
    // this.http.get(this.url).subscribe((res)=> {
    //   // console.log(res)
    //   this.ofertas = res;
    // })
    // console.log(this.ofertas);
  // }

}
