import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private socket: Socket) { }


  sendMessage(msg){
    this.socket.emit('hi',msg);
  }

  getMessage(){
    return Observable.create((observer)=>{
      this.socket.on('hi', (msg)=>{
        observer.next(msg);
      });
    });
  }


}
