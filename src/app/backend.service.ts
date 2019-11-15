import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  logWeight(weight: number) {
    return this.http.post(
      'https://sspeaks-functions.azurewebsites.net/api/HttpTrigger1?code=hFYzRyY6Olqn/O41xJkt9aOkcedshYhaWMM/ddTtrHq2gav2B3FO7w==',
      { weight },
      { responseType: "text" }
    );
  }
}
