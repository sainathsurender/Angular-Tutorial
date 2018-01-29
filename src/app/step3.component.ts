import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { CDMSService } from './cdms-service';
import { config } from './app.config';
import { Request } from './request.model';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  providers: [CDMSService,NotificationsService]
})
export class Step3Component implements OnInit {
  ShowLoader = false;
  model;
  options = config.PopupConfig;
  SelectedFundCode = [];
  SelectedBatchDate = [];
  
  constructor(private http: Http, private service: CDMSService, private _service: NotificationsService) { }

  ngOnInit() {
    this.ShowLoader = true;
    this.http.get('../assets/funds.json').subscribe(data => {
      this.model = data.json();
    })
    this.ShowLoader = false;
  }

  Execute(SelectedFund, BatchDate) {
    this.ShowLoader = true;
    let request = new Request();
    request.BatchDate = BatchDate;

    if (SelectedFund != null) {
      request.FundName = SelectedFund.FundName;
      request.FundCode = SelectedFund.FundCode;

      this.ExecuteQuery(request);

    }
    else {
      this.http.get('../assets/funds.json').subscribe(data => {
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
