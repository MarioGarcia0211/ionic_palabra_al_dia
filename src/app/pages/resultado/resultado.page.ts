import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  mensaje: string = '';
  aciertos: number = 0;
  coincidencias: number = 0;
  fallos: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      mensaje: string,
      aciertos: number,
      coincidencias: number,
      fallos: number
    };

    if (state) {
      this.mensaje = state.mensaje;
      this.aciertos = state.aciertos;
      this.coincidencias = state.coincidencias;
      this.fallos = state.fallos;
    }
  }

  ngOnInit() {}

  irHome() {
    this.router.navigate(['/home'], { state: { reset: true } });
  }
}
