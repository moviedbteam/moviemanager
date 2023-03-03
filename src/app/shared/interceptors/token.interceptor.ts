import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { isEmpty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  cloneRequest!:HttpRequest<unknown>;

  constructor() {}



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   

    let token = localStorage.getItem('token');
    
    console.log(request); // DEBUG

    if(request.url.includes(environment.base_url_apiBack)) {
      if(request.method == 'POST' || request.method == 'GET') {
        this.cloneRequest = request
        .clone({headers: request.headers.set('authorization', 'Bearer '+token)})
      } else {
        this.cloneRequest = request;
      }
    }
    else {
      this.cloneRequest = request;
    }

    console.log(this.cloneRequest);

    return next.handle(this.cloneRequest);
  }
}