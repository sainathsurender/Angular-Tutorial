import { Component } from '@angular/core';

import { CDMSService } from './cdms-service';
import { config } from './app.config';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  providers: [CDMSService]
})
export class Step2Component {

  ShowLoader = false;
  ShowSuccessMessage = false;
  SuccessMessage;
  ShowErrorMessage = false;
  ErrorMessage;
  constructor(private service: CDMSService) {

  }
 
  ReadXML() {
    this.ShowLoader = true;
    this.service.get(config.APIPath + '/ReadXML').subscribe(data => {
      if (data != undefined && data.ResponseStatus == config.Success) {
        this.ShowSuccessMessage = true;
        this.SuccessMessage = "Files read successfully";
      }
      else {
        this.ShowErrorMessage = true;
        this.ErrorMessage = data.ResponseMessage;
      }
    });
    this.ShowLoader = false;
  }

  UpdateEUIN() {
    this.ShowLoader = true;
    this.service.get(config.APIPath + '/UpdateEUIN').subscribe(data => {
      if (data != undefined && data.ResponseStatus == config.Success) {
        this.ShowSuccessMessage = true;
        this.SuccessMessage = "Files read successfully";
      }
      else {
        this.ShowErrorMessage = true;
        this.ErrorMessage = data.ResponseMessage;
      }
    });
    this.ShowLoader = false;
  }
}
