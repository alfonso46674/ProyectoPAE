import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }


  initialize(email){
    this.socket.emit('Inicio', email);
  }

  showMyOffers(){
    this.socket.emit(sessionStorage.getItem('usuarioActual'), '' );
  }




  getMessage(){
    return Observable.create((observer)=>{
      this.socket.on(sessionStorage.getItem('usuarioActual'), (msg)=>{
        observer.next(msg);
      });
    });
  }


}
