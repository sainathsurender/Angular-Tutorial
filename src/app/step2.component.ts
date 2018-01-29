import { Component } from '@angular/core';

import { CDMSService } from './cdms-service';
import { config } from './app.config';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  providers: [CDMSService,NotificationsService]
})
export class Step2Component {

  ShowLoader = false;
  constructor(private service: CDMSService, private _service: NotificationsService) { }
  options = config.PopupConfig;
 
  ReadXML() {
    this.ShowLoader = true;
    this.service.get(config.APIPath + '/ReadXML').subscribe(data => {
      if (data != undefined && data.ResponseStatus == config.Success) {
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
