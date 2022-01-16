import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BodyRequestInterceptorService implements HttpInterceptor {
  // Acá no se si este observable se finaliza solo como los observables de httpclient
  // O si hay que finalizarlo, igualmente al ser una app tan chica no hace falta en este caso
  // Pero vale la pena averiguarlo

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((res) => console.log(res)));
  }
}
