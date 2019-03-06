import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AppConst } from '../../app.constants';
import { tap } from 'rxjs/operators';
import { UserStorageProvider } from '../../services/storage/user-storage.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private userStorage: UserStorageProvider,
    ) {
         console.log(this.userStorage.get());
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        req = req.clone({
            headers: req.headers.set('app-language', 'en')
        });
        let token = '';
        const userData = this.userStorage.get();
        if (userData && userData.userToken) {
            token = userData.userToken;
        }
        const customReq = this.handleBodyIn(req, token, 'userToken');
        // send cloned request with header to the next handler.
        return next
            .handle(customReq)
            .pipe(
                tap((ev: HttpEvent<any>) => {
                    // do nothing
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                      console.log('err', err);
                      if (err.status === 400) {
                        if (err.error &&  err.error.responseCode === '320') {
                          this.userStorage.clear();
                          location.reload(true);
                        }
                      }
                    }
                })
            );
    }
    handleBodyIn(req: HttpRequest<any>, tokenToAdd, tokenName) {
        if (req.method.toLowerCase() === 'post') {
          if (req.body instanceof FormData) {
            req =  req.clone({
              body: req.body.append(tokenName, tokenToAdd)
            });
          } else {
            const foo = {}; foo[tokenName] = tokenToAdd;
            req =  req.clone({
              body: {...req.body, ...foo}
            });
          }
        }
        if (req.method.toLowerCase() === 'get') {
          req = req.clone({
            params: req.params.set(tokenName, tokenToAdd)
          });
        }
        return req;
      }
}
