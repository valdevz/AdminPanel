import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  env= environment;
  constructor(private http : HttpClient) {}

  getCovid(): Observable<any> {
    return this.http.get(this.env.covidApi + 'v2/all?yesterday', { responseType: 'json' });
  }


}
