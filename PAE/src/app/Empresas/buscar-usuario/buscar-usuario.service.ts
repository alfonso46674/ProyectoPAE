import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService { 

  usuarios;

  usersSubject = new Subject<object[]>();



  url = 'http://localhost:3000/api/usuarios'

  constructor(private http: HttpClient) {
    this.loadUsers();
    this.usersSubject.next(this.getUsers());
   }


   loadUsers(){
     this.http.get(this.url).subscribe(
      (data)=>{
        console.log(data);
        this.usuarios = Object.values(data);
        this.usersSubject.next(this.getUsers());
      },
      (err)=>console.log(err)
    )

  }


  getUsers(){
    console.log({getUsers:this.usuarios});
    return this.usuarios;
  }


}


