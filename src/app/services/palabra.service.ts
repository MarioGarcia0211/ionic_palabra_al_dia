import { Palabra } from './../models/palabra';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {

  //Construye la URL completa de la API concatenando la URL base del entorno con la ruta específica de palabras.
  apiUrl = environment.url+'palabras';

  //El constructor inyecta el HttpClient para realizar las solicitudes HTTP.
  constructor(private http: HttpClient) { }

  //getPalabras(): Hace una solicitud GET a la URL de la API (apiUrl) para obtener las palabras. Retorna un Observable<any> que permite manejar la respuesta asincrónica.
  getPalabras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
