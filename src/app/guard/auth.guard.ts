import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CDMSService } from '../Services/cdms-service';
import { Request } from '../Model/request.model';
import { config } from '../Services/app.config';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _CDMSService: CDMSService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let model = new Request();
        model.Username = localStorage.getItem('currentUser');
            
        return this._CDMSService.post(config.LoginAPIPath + `/AuthenticateLogin`, model).map((auth) => {
            if (auth != undefined && auth.ResponseStatus == config.Success) {
                console.log('authenticated');
                return true;
            }
            console.log('not authenticated');
            this.router.navigateByUrl('/Login');
            return false;
        })
    }
}