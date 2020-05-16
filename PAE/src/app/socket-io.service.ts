import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  correoTrabajador = "VACIO";

  constructor(private socket: Socket) { }


  initialize(email){
    this.socket.emit('Inicio', email);
  }

  showMyOffers(){
    this.socket.emit(sessionStorage.getItem('usuarioActual'), 'ofertasMismaEmpresa' );
  }

  showOtherOffers(correoUsuario){
    this.correoTrabajador = correoUsuario;
    this.socket.emit(sessionStorage.getItem('usuarioActual'), correoUsuario);
    this.socket.emit(correoUsuario);
  }


  getOffers(){
    return Observable.create((observer)=>{
      this.socket.on(sessionStorage.getItem('usuarioActual'), (msg)=>{
        observer.next(msg);
      });
    });
  }

  getOtherOffers(){
    // console.log("Other offers");
    // if(this.correoTrabajador != "VACIO"){
      console.log("Entre other offers");
      // let correo = this.correoTrabajador;
      // this.correoTrabajador = "VACIO";

      return Observable.create((observer)=>{
        this.socket.on(this.correoTrabajador, (msg)=>{
          console.log(msg);
          observer.next(msg);
        });
      });
    }
    
  //   else{
  //     return false;
  //   }

  // }


}
