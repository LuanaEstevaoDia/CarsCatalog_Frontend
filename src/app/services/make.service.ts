import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Make } from '../models/make';

@Injectable({
  providedIn: 'root'
})
export class MakeService {
  http = inject(HttpClient);
  
    API = "http://localhost:8080/make";

  constructor() {}

  getAllMakes(): Observable<Make[]>{
    return this.http.get<Make[]>(this.API + "/all");
  }
  getMakeById(id: number): Observable<Make>{
    console.log(`Fazendo chamada GET para: ${this.API}/${id}`)
    return this.http.get<Make>(`${this.API}/${id}`);
  }
  saveMake(make: Make): Observable<Make>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Cabeçalhos HTTP:', headers);
    return this.http.post<Make>(`${this.API}/save`, make, {headers});

  }
  updateMake(make: Make, id:number): Observable<Make>{
    return this.http.put<Make>(`${this.API}/update/${id}`, make);
  }
  deleteMake(id: number): Observable<string>{
    return this.http.delete<string>(this.API +`/delete/` + id,{responseType: "text" as "json"});
  }
}
