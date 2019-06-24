import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Weight = {
  weight: number,
  timestamp: number
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  logWeight(weight: number) {
    return this.http.post(
      '/api/weight',
       {weight}
       );
  }

  getWeights(): Observable<Weight[]> {
    return this.http.get(
      '/api/weight'
    ) as Observable<Weight[]>;
  }
}
