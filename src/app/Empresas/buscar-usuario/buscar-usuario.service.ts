import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarUsuarioService { 

  usuarios;

  usersSubject = new Subject<object[]>();



  url = environment.url +'/api/usuarios'

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


