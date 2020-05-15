import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-competencia',
  templateUrl: './ver-competencia.component.html',
  styleUrls: ['./ver-competencia.component.scss']
})
export class VerCompetenciaComponent implements OnInit, OnDestroy {

  msg = "";
  listaMensajes;

   
  mensajesSubscription: Subscription;

  constructor(private socketIoService: SocketIoService) { }

  ngOnDestroy():void{
    this.mensajesSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mensajesSubscription = this.socketIoService.
    getMessage()
    .subscribe((msg:string)=>{
      this.listaMensajes = msg;
      console.log(this.listaMensajes);
    });


    this.socketIoService.initialize(window.sessionStorage.getItem('usuarioActual'));
  }


  verOfertasPropias(){
    // console.log(window.sessionStorage.getItem('usuarioActual'));
    this.socketIoService.showMyOffers();
  }


}
