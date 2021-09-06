import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getBooks(body): Observable<any> {
    return this.httpClient.get<any>(`https://www.googleapis.com/books/v1/volumes?key=${environment.googleKey}`, {
      params: body
    });
  }
}
