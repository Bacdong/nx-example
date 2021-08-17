import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "apps/news/src/environments/environment";
 
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  constructor(private http: HttpClient) {}

  private _formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.api_url}/v${environment.api_version}/CMS/${path}/`, { params }
    ).pipe(catchError(this._formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}/v${environment.api_version}/CMS/${path}/`,
      JSON.stringify(body)
    ).pipe(catchError(this._formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}/v${environment.api_version}/CMS/${path}/`,
      JSON.stringify(body)
    ).pipe(catchError(this._formatErrors));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    return this.http.delete(
      `${environment.api_url}/v${environment.api_version}/CMS/${path}/`, { body }
    ).pipe(catchError(this._formatErrors));
  }
}