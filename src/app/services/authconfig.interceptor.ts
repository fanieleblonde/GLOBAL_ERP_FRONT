import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(req);
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //
  //     if (this.storageService.isLoggedIn()) {
  //       return this.authService.refreshToken().pipe(
  //         switchMap(() => {
  //           this.isRefreshing = false;
  //
  //           return next.handle(request);
  //         }),
  //         catchError((error) => {
  //           this.isRefreshing = false;
  //
  //           if (error.status == '403') {
  //             this.eventBusService.emit(new EventData('logout', null));
  //           }
  //
  //           return throwError(() => error);
  //         })
  //       );
  //     }
  //   }
  //
  //   return next.handle(request);
  // }


}
