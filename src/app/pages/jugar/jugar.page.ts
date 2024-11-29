import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PalabraService } from '../../services/palabra.service';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {

  //Propiedades publicas
  public nombre!: string;
  public dificultad!: string;
  public inicioTiempo!: number;

  public id: number = 0;
  public nivel: any = '';
  public opciones: any = [
    { id: 1, name: 'Fácil', opc: 7, color: 'primary' },
    { id: 2, name: 'Normal', opc: 5, color: 'warning' },
    { id: 3, name: 'Difícil', opc: 3, color: 'danger' },
  ];

  public numfilas: number[] = [];
  public palabras: string[] = [];
  public palabra: string = '';
  public letras: string[] = [];
  public filaActiva: number = 0;

  //Propiedades privadas
  private intentos: number = 0;
  private estadosTotales: string[] = [];

  //El constructor inicializa las dependencias y maneja el estado de navegación para configurar los datos del jugador y el nivel de dificultad. Si no hay estado, llama a reiniciarVariables().
  constructor(
    private router: Router,
    public activedRoute: ActivatedRoute,
    private palabraService: PalabraService,
    private recordService: RecordService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      jugador: string;
      inicioTiempo: number;
      nivel: string;
    };

    if (state) {
      this.nombre = state.jugador;
      this.dificultad = state.nivel;
    } else {
      this.reiniciarVariables();
    }
  }

  //Método que se ejecuta al inicializar el componente. Configura el nivel de dificultad y las filas según el nivel, y obtiene la lista de palabras del servicio PalabraService
  ngOnInit() {
    this.id = this.activedRoute.snapshot.params['id'];
    this.nivel = this.opciones.find((item: any) => item.id == this.id);
    this.numfilas = Array(this.nivel.opc).fill(0).map((x, i) => i);

    //hace la llamada al método getPalabras() del PalabraService, que devuelve un Observable. La respuesta contiene las palabras que se almacenan en this.palabras, y luego se selecciona una palabra aleatoria.
    this.palabraService.getPalabras().subscribe(data => {
      this.palabras = data.map((item: any) => item.palabra);
      this.seleccionarPalabraAleatoria();
    });
  }

  //Selecciona una palabra aleatoria de la lista de palabras y la divide en letras
  seleccionarPalabraAleatoria() {
    const rand = Math.floor(Math.random() * this.palabras.length);
    this.palabra = this.palabras[rand];
    this.letras = this.palabra.split('');
    console.log('Palabra para adivinar: ',this.letras);
    this.inicioTiempo = Date.now();
  }

  //Reinicia las variables del juego
  reiniciarVariables() {
    this.nombre = '';
    this.dificultad = '';
    this.inicioTiempo = Date.now();
    this.palabra = '';
    this.letras = [];
    this.intentos = 0;
    this.estadosTotales = [];
    this.filaActiva = 0;
  }

  onFilaAdivinada(event: { adivinada: boolean, estados: string[] }) {
    //Actualiza los estados de las letras
    this.estadosTotales.push(...event.estados);
    //Incrementa el número de intentos
    this.intentos++;

    //Si la fila es adivinada, calcula el tiempo y el puntaje, y guarda el record
    if (event.adivinada) {
      const tiempo = Math.floor((Date.now() - this.inicioTiempo) / 1000);
      const aciertos = this.estadosTotales.filter(e => e === 'acierto').length;
      const coincidencias = this.estadosTotales.filter(e => e === 'casi').length;
      const fallos = this.estadosTotales.filter(e => e === 'fallo').length;

      const puntaje = {
        jugador: this.nombre,
        dificultad: this.nivel.name,
        tiempo: tiempo
      };
      
      console.log('Felicidades has adivinado la palabra');
      console.log('Nombre: ', this.nombre, ' Dificultad: ', this.nivel.name, ' Aciertos: ', aciertos,  ' Coincidencias: ', coincidencias, ' Fallos: ', fallos, ' Tiempo: ', tiempo,'segundos');
      
      
      //Hace la llamada al método postRecord() del RecordService para enviar un nuevo registro con el puntaje del jugador. La respuesta de la API, cuando se completa, redirige al usuario a la página de resultados con un mensaje adecuado y estadísticas del juego.

    //   this.recordService.postRecord(puntaje).subscribe(() => {
    //     this.router.navigate(['/resultado'], {
    //       state: {
    //         mensaje: `¡Felicidades! Has adivinado la palabra en ${tiempo} segundos.`,
    //         aciertos,
    //         coincidencias,
    //         fallos
    //       }
    //     });
    //   });
    } 

    //Si no se adivina y se han agotado los intentos, muestra el mensaje de error.
    else if (this.intentos >= this.numfilas.length) {
      const aciertos = this.estadosTotales.filter(e => e === 'acierto').length;
      const coincidencias = this.estadosTotales.filter(e => e === 'casi').length;
      const fallos = this.estadosTotales.filter(e => e === 'fallo').length;

      console.log('Lo siento, no has adivinado la palabra. La palabra correcta era:', this.palabra);
      console.log('Nombre: ', this.nombre, ' Dificultad: ', this.nivel.name, ' Aciertos: ', aciertos,  ' Coincidencias: ', coincidencias, ' Fallos: ', fallos);

      // this.router.navigate(['/resultado'], {
      //   state: {
      //     mensaje: `Lo siento, no has adivinado la palabra. La palabra correcta era: ${this.palabra}.`,
      //     aciertos,
      //     coincidencias,
      //     fallos
      //   }
      // });
    } 
    //Si no se ha adivinado pero hay más intentos, incrementa la fila activa
    else {
      this.filaActiva++;
    }
  }
}
