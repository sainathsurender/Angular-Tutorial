import { Component } from '@angular/core';

import { CDMSService } from '../Services/cdms-service';
import { config } from '../Services/app.config';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  host: {'class': 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'},
  providers: [CDMSService,NotificationsService]
})
export class Step2Component {

  ShowLoader = false;
  constructor(private service: CDMSService, private _service: NotificationsService) { }
  options = config.PopupConfig;
  _lstBatchDates :any[];
 
  ReadXML() {
    this.ShowLoader = true;
    this.service.get(config.APIPath + '/ReadXML').subscribe(data => {
      if (data != undefined && data.ResponseStatus == config.Success) {
        this._lstBatchDates = data.lstBatchDates;
        this._service.success('Success',"Files read successfully");
      }
      else {
        this._service.error('Error',data.ResponseMessage);
      }
      this.ShowLoader = false;
    });
  }

  UpdateEUIN() {
    this.ShowLoader = true;
    this.service.get(config.APIPath + '/UpdateEUIN').subscribe(data => {
      if (data != undefined && data.ResponseStatus == config.Success) {
        this._service.success('Success',"EUIN Updated successfully");
      }
      else {
        this._service.error('Error',data.ResponseMessage);
      }
      this.ShowLoader = false;
    });
  }
}
