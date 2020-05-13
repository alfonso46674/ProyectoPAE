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

  ngOnInit(): void {
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
    this.http.post('http://localhost:3000/upload', formData).subscribe((res) => console.log("test"));

  }

  uploadLocalImage(form: NgForm){
    let formData = new FormData();
    formData.append("image", this.image);
    this.http.post('http://localhost:3000/upload_local', formData).subscribe((res) => console.log("test"));

  }

}
