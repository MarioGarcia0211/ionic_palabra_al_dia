import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})
export class FilaComponent implements OnInit {

  //Propiedades Input
  @Input() palabra!: string; //La palabra completa que se está tratando de adivinar
  @Input() letras!: string[]; //Un array de letras que forman la fila actual
  @Input() activa: boolean = false; //Indica si la fila está activa y puede recibir entrada del usuario

  //Propiedad Output
  @Output() filaAdivinada = new EventEmitter<{ adivinada: boolean, estados: string[] }>();//Evento que se emite cuando todas las letras en la fila han sido verificadas. Emite un objeto con adivinada (un booleano que indica si la fila ha sido adivinada correctamente) y estados (un array de estados de cada letra)

  //Propiedad privada estados
  private estados: string[] = []; //Un array para almacenar los estados de cada letra en la fila ('acierto', 'casi', 'fallo').

  constructor() {}

  ngOnInit() {}

  //Método que se llama cuando cambia una letra en la fila
  onLetraCambiada(event: { letra: string, estado: string }) {

    //Añade el estado de la letra recibida al array estados
    this.estados.push(event.estado);

    //Comprueba si el número de estados almacenados es igual al número de letras en la fila
    if (this.estados.length === this.letras.length) {

      //Si todos los estados son 'acierto', establece adivinada a true; de lo contrario, a false.
      const adivinada = this.estados.every(estado => estado === 'acierto');

      //Emite el evento filaAdivinada con el estado de la fila (adivinada y estados).
      this.filaAdivinada.emit({ adivinada, estados: this.estados });
    }
  }
}
