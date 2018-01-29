import { Component } from '@angular/core';

import { ExecutionStatusListDto } from './execution-status-list-dto';
import { CDMSService } from './cdms-service';
import { NotificationsService } from 'angular2-notifications';
import { config } from './app.config';
import { Request } from './request.model';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  providers: [CDMSService, NotificationsService]
})
export class Step4Component {

  ShowLoader = false;
  options = config.PopupConfig;
  model = [];
  SelectedBatchDate = [];
  CDMSExecutionLogList:any[];
  SelectFundCode = [];

  constructor(private objCDMSService: CDMSService, private _service: NotificationsService) { };

  SearchCDMSLog(SelectedFundCode, SelectedBatchDate) {
    this.ShowLoader = true;

    let request = new Request();
    request.BatchDate = SelectedBatchDate;
    request.FundCode = SelectedFundCode;

    this.objCDMSService.post(config.APIPath + 'GetLog', request)
      .subscribe(data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          if (data.CDMSExecutionLogList != null && data.CDMSExecutionLogList.length > 0) {
            this.model = data;
            this.CDMSExecutionLogList = data.CDMSExecutionLogList;
          }
          else {
            this.model = null;
            this._service.error('Error', "No data found.");
          }
        }
        else {
          this.model = null;
          this._service.error('Error', data.ResponseMessage);
        }

        this.ShowLoader = false;
      })
  }
}
