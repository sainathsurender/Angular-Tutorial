import { Component, OnInit } from '@angular/core';

import { CDMSService } from './cdms-service';
import { PopupComponent } from './popup.component';
import { config } from './app.config';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  providers: [CDMSService,NotificationsService]
})
export class Step1Component implements OnInit {

  constructor(private objCDMSService: CDMSService, private _service: NotificationsService) { }
  CDMSFile: any[];
  ExtractedFiles: any[];
  ShowLoader = false;
  options = config.PopupConfig;

  ngOnInit() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/CDMSFiles`).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this.CDMSFile = data.CDMSFiles;
        }
        else {
          this._service.error('Error',data.ResponseMessage);
        }

        this.ShowLoader = false;
      })
  }

  ViewExtractedFiles() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ExtractedFiles`).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this.ExtractedFiles = data.CDMSFiles;
        }
        else
        {
          this._service.error('Error',data.ResponseMessage);
          this.ExtractedFiles = null;
        }
        this.ShowLoader = false;
      })
  }

  ExtractFile(filename) {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ExtractFile?archiveFilenameIn=` + filename).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this._service.success('Success',"Files extracted successfully for " + filename);
        }
        else {
          this._service.error('Error',"Unable to extract for " + filename);
        }

        this.ShowLoader = false;
      });
  }

  ClearFiles() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ClearFiles`).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this._service.success('Success',"Files cleared successfully.");
        }
        else {
          this._service.error('Error',data.ResponseMessage);
        }

        this.ShowLoader = false;
      })
  }
}
