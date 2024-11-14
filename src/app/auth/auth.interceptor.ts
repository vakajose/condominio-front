// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {Constants} from '../constants/constants';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Ingresando al Interceptor")
    const token = this.authService.getToken();
    console.log("Obteniendo Token: ", token)
    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set(`${Constants.AUTHORIZATION}`, `${Constants.BEARER_PREFIX}${token}`)
      });
      console.log(clonedRequest)
      return next.handle(clonedRequest);
    }
    console.log(req)
    return next.handle(req);
  }
}
