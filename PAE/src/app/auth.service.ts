import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // jwt.io
  // payload, agregar atributo exp con fecha suficientemente grande para que no expire
  token = '';
  tipoUsuario = new BehaviorSubject<string>('');
  logueado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string){
    localStorage.setItem('token', token);
    this.token = token;
  }

  private saveUserType(type: string){
    localStorage.setItem('tipoUsuario', type);

    if(type === 'Trabajador'){
      this.tipoUsuario.next('Trabajador');
    }
    else if(type === 'Empresa'){
      this.tipoUsuario.next('Empresa');
    }
    else if(type === 'Admin'){
      this.tipoUsuario.next('Admin');
    }
    else{
      this.tipoUsuario.next('');
    }
  }

  //Guarda el email del usuario actual ; podria causar conflicto con socket io si se hace de esta manera
  saveCurrentUser(email:string){
    localStorage.setItem('usuarioActual', email)
  }

  public isLoggedIn(): boolean{
    const tokenData = this.getTokenData();
    // console.log(tokenData);

    if(tokenData){ // si existe puede que este logeado
      let resp = tokenData.exp > Date.now() / 1000; // verificar si no esta expirado el token
      this.logueado.next(true);

      return resp;
    }else{ // no esta logeado
      this.logueado.next(false);
      return false;
    }
  }

  public getTokenData(){
    let payload;
    if(this.token){
      payload = this.token.split('.')[1];
      payload = window.atob(payload); // convierte los datos encriptados del payload a algo legible
      return JSON.parse(payload);
    }else{
      return null;
    }
  }


  public login(email: string, password: string): Observable<any>{
    return this.http
                  .post(environment.url + '/api/login', {email, password})
                  .pipe(
                    map((data:any)=>{ // para decidir que hacer con la informacion del post antes de regresar el observable
                      // console.log(data);
                      if(data.token){
                        this.saveToken(data.token); // guarda el token en el servicio a partir del post al backend
                        this.saveUserType(data.tipo);
                        this.saveCurrentUser(email);
                        this.isLoggedIn(); // para que refresque el behavior logueado
                      }
                      this.router.navigateByUrl('/');
                      return data;
                    })
                  );
  }


  public logout(){
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.logueado.next(false);
  }

  public googleLogin(params){
     return this.http.get(environment.url + '/api/google/redirect',{params})
     .pipe(
      map((data:any)=>{ // para decidir que hacer con la informacion del post antes de regresar el observable
        if(data.token){
          // console.log(data);
          this.saveToken(data.token); // guarda el token en el servicio a partir del post al backend
          this.saveUserType('Trabajador');
          this.saveCurrentUser(data.email);
          this.isLoggedIn(); // para que refresque el behavior logueado
        }
        return data;
      })
    );

  }
}
