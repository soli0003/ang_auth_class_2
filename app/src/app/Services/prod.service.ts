import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdService {
  constructor(private http: HttpClient) { }
  SERVER_URL = 'http://127.0.0.1:8000/products';
  URL = 'http://127.0.0.1:8000/showProds';

  showProducts(): Observable<any> {
    return this.http.get<any>(this.URL);
  }
  
  uploadImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<any>(this.SERVER_URL + '/upload', formData, { headers: headers });
  }
  
  addProduct(prd: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(this.SERVER_URL, prd, { headers: headers });
  }

  delProduct(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.delete<any>(this.SERVER_URL + '/' + id, { headers: headers });
  }
 updProduct(prd: any, id: number, image: File | null): Observable<any> {
  const formData: FormData = new FormData();
  if (image) {
    formData.append('image', image, image.name);
  }
  formData.append('price', prd.price);
  formData.append('desc', prd.desc);

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  return this.http.put<any>(`${this.SERVER_URL}/${id}`, formData, { headers: headers });
}

  
}