import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketIoService } from 'src/app/socket-io.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-competencia',
  templateUrl: './ver-competencia.component.html',
  styleUrls: ['./ver-competencia.component.scss']
})
export class VerCompetenciaComponent implements OnInit, OnDestroy {

  correoUsuario;
  OfertasPropias;
  OfertasCompetencia;
   
  misOfertasSubscription: Subscription;
  otrasOfertasSubscription: Subscription;

  constructor(private socketIoService: SocketIoService) { }

  ngOnDestroy():void{
    this.misOfertasSubscription.unsubscribe();
    this.otrasOfertasSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.misOfertasSubscription = this.socketIoService.
    getOffers()
    .subscribe((msg:string)=>{
      this.OfertasPropias = msg;
      console.log(this.OfertasPropias);
    });

    // this.otrasOfertasSubscription = this.socketIoService.
    // getOtherOffers()
    // .subscribe((msg:string)=>{
    //   this.OfertasCompetencia = msg;
    //   console.log(this.OfertasCompetencia);
    // });
    

    this.socketIoService.initialize(window.sessionStorage.getItem('usuarioActual'));

  }


  verOfertasPropias(){
    // console.log(window.sessionStorage.getItem('usuarioActual'));
    this.socketIoService.showMyOffers();
  }

  mandarCorreoUsuario(){
    console.log(this.correoUsuario);
    this.socketIoService.showOtherOffers(this.correoUsuario);


    this.otrasOfertasSubscription = this.socketIoService.
    getOtherOffers()
    .subscribe((msg)=>{
      console.log(msg);
      this.OfertasCompetencia = msg;
      console.log(this.OfertasCompetencia);
    });
  }


}
