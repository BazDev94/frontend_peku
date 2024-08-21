import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  getFakeNormative() {
    throw new Error('Method not implemented.');
  }
  private cache: Map<string, Observable<unknown>> = new Map();

  constructor(private http: HttpClient) { }

  get_file(url: string, params: HttpParams, options?: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    options = options || {};
    options.params = params;
    options.responseType = options.responseType || 'json'; // Default 'json', ma qui useremo 'blob'
  
    return this.http.get(completedUrl, options);
  }

  
  get(url: string, params?: HttpParams,): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.get(completedUrl);

  }

  post(url: string, obj: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.post(completedUrl, obj);
  }

  patch(url: string, obj: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.patch(completedUrl, obj);
  }

  put(url: string, obj: any, h?: any): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.put(completedUrl, obj, h);
  }

  delete(url: string): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    return this.http.delete(completedUrl, {});
  }

  getFakeData(): Observable<any> {
    let obj = this.http.get('../assets/limits_IT_regions.geojson');
    return obj
  }

  getWithCache(url: string, noCache?: boolean,params?: HttpParams): Observable<any> {
    const completedUrl = environment.apiUrl + url;
    if (this.cache.has(completedUrl) && !noCache) {
      console.log('QUESTO RISULTATO E CACHATO -->', completedUrl);
      return this.cache.get(completedUrl) as Observable<any>;
    }
    let request: any = null;
    if (params) {
      request = this.http.get(completedUrl, { params }).pipe(
        //tap(() => console.log('Recupero dati dalle API')),
        shareReplay(1) // Cache the response
      );
    } else {
      request = this.http.get(completedUrl).pipe(
        //tap(() => console.log('Recupero dati dalle API')),
        shareReplay(1) // Cache the response
      );
    }


    this.cache.set(completedUrl, request);
    return request;
  }

}
