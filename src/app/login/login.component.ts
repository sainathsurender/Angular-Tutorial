import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { Request } from '../Model/request.model';
import { CDMSService } from '../Services/cdms-service';
import { config } from '../Services/app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {'class': 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'},
  styleUrls: ['./login.component.css'],
  providers:[CDMSService,NotificationsService]
})
export class LoginComponent implements OnInit {

  constructor(private http:CDMSService,private router:Router,private _service: NotificationsService) {};

  model = new Request();
  _lstFundCode;
  ShowLoader:boolean = false;
  SelectedFundCode:any;
  options = config.PopupConfig;

  ngOnInit() {
    this.ShowLoader = true;
    this.http.get(config.FundUrl).subscribe(data => {
      this._lstFundCode = data;
    })
    this.ShowLoader = false;
  }

  Login(model){
    this.ShowLoader = true;
    this.http.post(config.LoginAPIPath + `/Login`,model).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          localStorage.setItem('currentUser',model.Username);
          this.router.navigateByUrl('\Step1');
        }
        else {
          this._service.error('Error',data.ResponseMessage);
        }

        this.ShowLoader = false;
      })
  }
}
