import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {
  image;
  src;
  titulacion = ['Licenciatura', 'Maestría', 'Doctorado'];

  usuario;
  correoUsuarioLogeado = window.sessionStorage.getItem('usuarioActual')
  url = environment.url + '/api/usuarios/' + this.correoUsuarioLogeado;
  
  constructor(private http: HttpClient, private router: Router) { }

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

    this.http.post(environment.url + '/upload', formData).subscribe((res) => console.log("Subiendo imagen"));

  }

  submit(form: NgForm){
    console.log(form.value);
    console.log(this.url);
    this.http.put(this.url, form.value).subscribe((res=>console.log(res)))
    this.router.navigateByUrl('/usuario/perfil')

  }



}
