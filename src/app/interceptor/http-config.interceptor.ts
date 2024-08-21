// import { HttpInterceptorFn } from '@angular/common/http';

// export const httpConfigInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
// Import the following dependencies
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PekuService } from '../services/peku.service';
import { map } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(PekuService)
        let token = authService.getToken()

        if (token) { request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) }); }
        if (!request.headers.has('Content-Type')) { request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') }); }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ withCredentials: true });


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }));
    }
}
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
];