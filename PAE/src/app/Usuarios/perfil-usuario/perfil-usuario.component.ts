import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  image;
  src;

  constructor( private http: HttpClient) { }

  usuario;
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = 'http://localhost:3000/api/usuarios/'+ this.correoUsuarioLogeado;

  ngOnInit(): void {
    this.http.get(this.url).subscribe((res)=> this.usuario = res);
  }

  obtenerImage(event){
    this.image = event.target.files[0];
    console.log(this.image);

    let reader = new FileReader();
    reader.onloadend = () => {
      this.src = reader.result;
    }
    reader.readAsDataURL(this.image);
  }

  uploadImage(form: NgForm){
    let formData = new FormData();
    formData.append("image", this.image);

    let correoActual = window.sessionStorage.getItem('usuarioActual'); // mandar el correo para actualizar
    formData.append("email",correoActual);

    this.http.post('http://localhost:3000/upload', formData).subscribe((res) => console.log("Subiendo imagen"));

  }

  uploadLocalImage(form: NgForm){ // Comentado en el html el codigo que lo hace funcionar
    let formData = new FormData();
    formData.append("image", this.image);
    this.http.post('http://localhost:3000/upload_local', formData).subscribe((res) => console.log("test"));

  }

}
