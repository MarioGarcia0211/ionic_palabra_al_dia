import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  //Construye la URL completa de la API concatenando la URL base del entorno con la ruta específica de records.
  apiUrl = environment.url+'records';

  //El constructor inyecta el HttpClient para realizar las solicitudes HTTP
  constructor(private http: HttpClient) { }

  //Hace una solicitud GET a la URL de la API (apiUrl) para obtener los registros. Retorna un Observable<any> que permite manejar la respuesta asincrónica.
  getRecord(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  //Hace una solicitud POST a la URL de la API (apiUrl) para enviar un nuevo registro. Toma un parámetro element que contiene los datos del registro y retorna un Observable<any> que permite manejar la respuesta asincrónica.
  postRecord(element: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, element);
  }
}
