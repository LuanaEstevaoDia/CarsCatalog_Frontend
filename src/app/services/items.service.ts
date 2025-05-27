import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/item';

  constructor() {}

  getAllItems(): Observable<Item[]> {
    console.log(`Fazendo chamada GET  ${this.API}/all`);
    return this.http.get<Item[]>(this.API + '/all');
  }
  deleteItem(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, {
      responseType: 'text' as 'json',
    });
  }
  getItemById(id: number): Observable<Item> {
    console.log(`Fazendo chamada GET para: ${this.API}/${id}`);
    return this.http.get<Item>(`${this.API}/${id}`);
  }

  saveItem(item: Item): Observable<Item> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('Cabeçalhos HTTP:', headers);
    return this.http.post<Item>(`${this.API}/save`, item, { headers });
  }

  updateItems(item: Item, id: number): Observable<Item> {
    return this.http.put<Item>(`${this.API}/update/${id}`, item);
  }
}
