import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-empresa',
  templateUrl: './registro-empresa.component.html',
  styleUrls: ['./registro-empresa.component.scss']
})
export class RegistroEmpresaComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm){
    // console.log(form.value);
    this.http.post('http://localhost:3000/api/empresas', form.value).subscribe((res)=>console.log(res))
    this.router.navigateByUrl('/login')
  }

  

}
