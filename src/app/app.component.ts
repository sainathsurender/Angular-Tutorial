import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CDMSService } from './Services/cdms-service';
import { config } from './Services/app.config';
import { Request } from './Model/request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[CDMSService]
})
export class AppComponent {
  constructor(private _service:CDMSService,private _Router:Router) { };

  SignOut(){
    let model = new Request();
    model.Username = localStorage.getItem('currentUser');
    
    this._service.post(config.LoginAPIPath + `/Logout`,model).subscribe(data =>
      {
        if (data != undefined && data.ResponseStatus == config.Success) {
          console.log('success logout');
          this._Router.navigateByUrl('/Login');
        }
        else {
          console.log('error logout');
          // error
          alert('error');
        }        
      }
    )
  }
}
