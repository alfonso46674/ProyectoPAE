import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {

  titulacion = ['Licenciatura', 'Maestría', 'Doctorado'];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm){
    this.http.post(environment.url +'/api/usuarios', form.value).subscribe((res=>console.log(res)))
    this.router.navigateByUrl('/login')
  }
}
