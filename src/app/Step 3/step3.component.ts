import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { CDMSService } from '../Services/cdms-service';
import { PopupComponent } from '../Custom Components/popup.component';
import { config } from '../Services/app.config';
import { Request } from '../Model/request.model';

import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  host: {'class': 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'},
  providers: [CDMSService,NotificationsService]
})
export class Step3Component implements OnInit {
  ShowLoader = false;
  model;
  options = config.AutoClosePopupConfig;
  SelectedFundCode:any;
  SelectedBatchDate:any;
  _productUrl: string = config.FundUrl;
  
  constructor(
    private http: Http, 
    private service: CDMSService, 
    private _service: NotificationsService) { }

  ngOnInit() {
    this.ShowLoader = true;
    this.http.get(this._productUrl).subscribe(data => {
      this.model = data.json();
    })
    this.ShowLoader = false;
  }

  Execute(SelectedFund, BatchDate) {
    this.ShowLoader = true;
    let request = new Request();
    request.BatchDate = BatchDate;
    console.log(SelectedFund);
    if (SelectedFund != null) {
      request.FundName = SelectedFund.FundName;
      request.FundCode = SelectedFund.FundCode;

      this.ExecuteQuery(request);

    }
    else {
      this.http.get(this._productUrl).subscribe(data => {
        this.model = data.json();
      })

      if (this.model != null && this.model.length > 0) {

        this.model.forEach(element => {

          request.FundName = element.FundName;
          request.FundCode = element.FundCode;
          
          this.ExecuteQuery(request);
        });
      }
    }
    this.ShowLoader = false;
  }

  ExecuteQuery(body) {
    this.ShowLoader = true;
    this.service.post(config.APIPath + 'ExecuteCDMSForFunds', body)
      .subscribe(data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this._service.success('Success',"CDMS schedules created successfully.");
        }
        else {
          this._service.error('Error',"Unable to create CDMS schedules.");
        }
        this.ShowLoader = false;
      })
  }
}
