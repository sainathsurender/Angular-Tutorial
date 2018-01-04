import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { CDMSService } from './cdms-service';
import { config } from './app.config';
import { Request } from './request.model';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  providers: [CDMSService]
})
export class Step3Component implements OnInit {

  constructor(private http: Http, private service: CDMSService) { }

  model;

  ngOnInit() {
    this.http.get('../assets/funds.json').subscribe(data => {
      this.model = data.json();
    })
  }

  Execute(SelectedFund, BatchDate) {

    let request = new Request();
    request.BatchDate = BatchDate;

    if (SelectedFund != null) {
      request.FundName = SelectedFund.FundName;
      request.FundCode = SelectedFund.FundCode;

      // this.ExecuteQuery(request);

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
  }

  ExecuteQuery(body) {
    this.service.post(config.APIPath + 'ExecuteCDMSForFunds', body)
      .subscribe(data => {
        if (data != undefined && data.ResponseStatus == 0) {
          alert('11');
        }
        else {
          alert('12');
        }
      })
  }
}
