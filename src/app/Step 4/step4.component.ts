import { Component } from '@angular/core';

import { ExecutionStatusListDto } from '../Model/execution-status-list-dto';
import { CDMSService } from '../Services/cdms-service';
import { NotificationsService } from 'angular2-notifications';
import { config } from '../Services/app.config';
import { Request } from '../Model/request.model';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  host: {'class': 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'},
  providers: [CDMSService, NotificationsService]
})
export class Step4Component {

  ShowLoader = false;
  options = config.PopupConfig;
  model = [];
  SelectedBatchDate:any;
  CDMSExecutionLogList:any[];
  SelectFundCode:any;

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
      }
    )
  }
}
