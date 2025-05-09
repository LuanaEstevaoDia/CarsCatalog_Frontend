import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError,  } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  http = inject(HttpClient);

  API = "http://localhost:8080/car";

  constructor() {}

  getAllCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.API +"/all");
  }
  deleteCar(id: number): Observable<string>{
    return this.http.delete<string>(this.API +"/delete/" + id, {responseType: "text" as "json"});

  }
  getCarById(id: number): Observable<Car> {
    console.log(`Fazendo chamada GET para: ${this.API}/${id}`);
    return this.http.get<Car>(`${this.API}/${id}`)
    
  
 
  }

  
saveCar(car: Car): Observable<Car> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Cabeçalhos HTTP:', headers);
    return this.http.post<Car>(`${this.API}/save`, car, { headers });

}
 

updateCars(car: Car, id: number): Observable<Car> {
  return this.http.put<Car>(`${this.API}/update/${id}`, car);
  
  };
 
}


