import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrls: ['./usuario-main.component.scss']
})
export class UsuarioMainComponent implements OnInit {
  image;
  src;

  constructor(
    private http: HttpClient
  ) { }

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
