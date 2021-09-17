import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private http: HttpClient) { }
  url="https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7";
  getProducts(){
    return this.http.get(this.url);
  }
}
