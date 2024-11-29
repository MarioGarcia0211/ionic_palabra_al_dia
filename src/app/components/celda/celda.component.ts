import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.scss'],
})
export class CeldaComponent implements OnInit {

  //Propiedades Input
  @Input() posicion!: number; //La posición de esta celda dentro de la palabra
  @Input() palabra!: string; //La palabra completa a adivinar
  @Input() letra!: string; //La letra específica que esta celda debe contener
  @Input() activa: boolean = false; //Indica si la celda está activa y puede recibir entrada del usuario

  //Propiedades publicas
  public opcion: string = ''; //Almacena la letra que el usuario ingresa en esta celda
  public css: string = ''; // Almacena la clase CSS que determina el estado visual de la celda (acierto, casi, fallo)

  //Propiedad Output
  @Output() letraCambiada = new EventEmitter<{ letra: string, estado: string }>(); //Evento que se emite cuando la letra en la celda cambia, enviando un objeto con la letra ingresada y su estado (CSS)

  constructor() {}

  ngOnInit() {
    return 0;
  }

  //Método que comprueba la letra ingresada por el usuario
  onComprobar() {

    //Si la celda no está activa, no hace nada (return).
    if (!this.activa) return;
    //Convierte la letra ingresada a minúscula (inputLetra).
    const inputLetra = this.opcion.toLowerCase();
    //Si la letra ingresada es igual a la letra esperada (this.letra), asigna la clase acierto.
    if (inputLetra == this.letra) {
      this.css = 'acierto';
    } 
    //Si la letra ingresada está en la palabra pero no en la posición correcta, asigna la clase casi.
    else if (this.palabra.includes(inputLetra)) {
      this.css = 'casi';
    } 
    //Si la letra ingresada no está en la palabra, asigna la clase fallo.
    else {
      this.css = 'fallo';
    }

    //Emite un evento letraCambiada con la letra ingresada y su estado CSS.
    this.letraCambiada.emit({ letra: this.opcion, estado: this.css });
  }
}
