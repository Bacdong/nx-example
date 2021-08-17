import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ApiResponse, AuthToken } from "../models";
import { Subject } from "rxjs";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_url = 'http://dev.apivnu-gateway.epmt.com.vn:2051/api/cmd/v1/ACL/Accounts/Login';

  auth = new Subject<AuthToken>();
  isAuthenticated: boolean = false;
  
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
  ) {}

  private _formatErrors(error: any) {
    return throwError(error.error);
  }

  post(body: Object = {}): Observable<any> {
    return this.http.post(`${this.api_url}`, JSON.stringify(body))
      .pipe(catchError(this._formatErrors));
  }

  populate() {
    const accessToken = this.jwtService.getToken();
    if (!accessToken) {
      this.purgeAuth();
    }
  }

  login(credentials: any) {
    this.post(credentials).subscribe(
      (res: ApiResponse) => {
        if (!res.isOk) {
          alert(res.errorMessages);
          return;
        }

        this.auth.next(res.result);
      }
    )
  }

  setAuth(authToken: AuthToken) {
    this.jwtService.saveToken(authToken.accessToken);
    this.isAuthenticated = true;
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.isAuthenticated = false;
  }
}