import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  env= environment;
  constructor(private http : HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(this.env.ordersApi, { responseType: 'json' });
  }
}
