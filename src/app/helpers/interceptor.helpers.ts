// import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

import { Observable, from } from 'rxjs';
import { map, catchError, finalize, mergeMap } from 'rxjs/operators';

import { LoadingService } from './../services/loading.service';
import { RenderError } from './../interfaces/renderError.interface';

@Injectable()
export class InterceptorHelpers implements HttpInterceptor {

    countAlert = 0;

    constructor(
        private loadingService: LoadingService,
        public loadingController: LoadingController,
        private alertController: AlertController,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const execRequest = this.execRequest(request, next);
        return from(execRequest).pipe(
            mergeMap((req: Observable<HttpEvent<any>>) => req)
        );
    }

    async execRequest(request: HttpRequest<any>, next: HttpHandler): Promise<any> {
        if (next) {
            await this.loadingService.loadingPresent();
        }
        let headers = new HttpHeaders();
        headers = new HttpHeaders()
            .append('Content-Type', 'application/json');

        request = request.clone({ headers });
        return this.handler(next, request);
    }

    handler(next, request) {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (!event.body.status) {
                        this.trataError(event);
                    }
                    return event;
                }
            }),
            catchError(response => {
                console.log('catch', response);
                if (response.error && !response.error.status) {
                    const errorParams = {
                        msg: response.error.msg,
                        redirect: response.error.redirect ? true : false,
                        page: response.error.redirect ? response.error.redirect : '',
                        headerError: response.error.header ? response.error.header : '',
                    };
                    this.renderError(errorParams);
                    return [];
                }
                return [];
            }),
            finalize(() => {
                this.loadingService.loadingDismiss();
            })
        );
    }

    async renderError(params?) {
        const alertParams = {
            redirect: params.redirect ? params.redirect : null,
            page: params.page ? params.page : null,
            msgError: params.msg ? params.msg : 'Não é possível continuar. Tente novamente mais tarde',
            headerError: params.headerError ? params.headerError : 'Atenção',
            btnAlert: 'Entendido'
        };
        await this.showAlert(alertParams);
    }

    async showAlert(params) {
        const {
            headerError,
            msgError,
            btnAlert,
            redirect,
            page
        } = params;
        if (this.countAlert === 0) {
            this.countAlert++;
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: headerError,
                message: msgError,
                buttons: [
                    {
                        text: btnAlert,
                        cssClass: 'primary',
                        handler: async (e) => {
                            this.countAlert = 0;
                            if (redirect) {
                                this.router.navigate([page]);
                            }
                        }
                    }
                ]
            });
            await alert.present();
            this.loadingService.loadingDismiss();
        }
    }

    private trataError(event: any) {
        let redirect = false;
        let msgError = null;
        let headerError = null;

        if (event.body.msg) {
            msgError = event.body.msg;
        }

        if (event.body.redirect) {
            redirect = true;
        }

        if (event.body.headerError) {
            headerError = event.body.headerError;
        }

        const errorParams = {
            msg: msgError,
            redirect,
            page: event.body.redirect,
            headerError,
        };

        this.renderError(errorParams);
    }
}
