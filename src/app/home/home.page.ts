import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Variables publicas
  public nivel: number = 0; // Almacena el nivel de dificultad seleccionado.
  public jugador: string = ''; // Almacena el nombre del jugador.
  public inicioTiempo: number = 0; //Almacena el tiempo de inicio del juego.
  public opciones: any[] =[
    {id: 1, name:'Fácil', color: 'primary'},
    {id: 2, name:'Normal', color: 'warning'},
    {id: 3, name:'Difícil', color: 'danger'},
  ]; //Array que contiene las opciones de dificultad.


  constructor(public router: Router, private navCtrl: NavController) {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { reset: boolean };

    //Obtiene el estado de la navegación actual para comprobar si se debe resetear el nombre del jugador y el nivel.
    if (state && state.reset) {
      this.jugador = '';
      this.nivel = 0;
    }

   }

  ngOnInit() {
    return 0
  }


  
  comenzarJuego(id: number) {
    //Comprueba si el nombre del jugador y el nivel están definidos.
    if (this.jugador && this.nivel) {
      //Si están definidos, guarda el tiempo de inicio y navega a la página /jugar pasando el nombre del jugador, el nivel y el tiempo de inicio en el estado de la navegación.
      this.inicioTiempo = Date.now();
      this.router.navigate(['/jugar', id], {
        state: {
          jugador: this.jugador,
          nivel: this.nivel,
          inicioTiempo: this.inicioTiempo
        }
      });

    } 
    //Si no están definidos, muestra una alerta solicitando que se ingrese el nombre y se seleccione un nivel.
    else {
      alert('Por favor, ingrese su nombre y seleccione un nivel.');
    }
  }

  //Navega a la página /records donde se muestran los récords del juego.
  records(){
    this.router.navigate(['/records']);
  }

}
