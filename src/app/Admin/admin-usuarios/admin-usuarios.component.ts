import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {

  correoUsuarioEliminar;
  usuarios;
  url = environment.url + '/api/usuarios/admin'
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> {
      // console.log(res);
      // console.log({tipo: typeof(res)});
      // console.log((Object.values(res).length));

      this.usuarios = Object.values(res);
      // console.log(this.ofertas);
    });
  }

 eliminarUsuario(){
   this.http.delete(environment.url + '/api/usuarios/' + this.correoUsuarioEliminar).subscribe();
 }

}
