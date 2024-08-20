import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  private apiUrl = environment.API_URL;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

   /**
   * Posts data to the specified API endpoint.
   *
   * @param endpoint The API endpoint to send the data to.
   * @param data The data to be sent in the request body.
   * @param responseType The expected response type ('json' or 'text').
   * @returns An Observable that emits the response data from the API.
   */
   postData(endpoint: string, data: any, responseType: 'json' | 'text' = 'json'): Observable<any> {
    return this.http.post<any>(this.apiUrl + endpoint, data, {
      headers: this.headers,
      responseType: responseType as 'json'
    });
  }
}
