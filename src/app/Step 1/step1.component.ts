import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { CDMSService } from '../Services/cdms-service';
import { PopupComponent } from '../Custom Components/popup.component';
import { config } from '../Services/app.config';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-step1',
  templateUrl: 'step1.component.html',
  host: {'class': 'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'},
  providers: [CDMSService,NotificationsService]
})
export class Step1Component implements OnInit {

  constructor(private objCDMSService: CDMSService, private _service: NotificationsService,private modalService: NgbModal) { }
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

  ViewExtractedFiles(content) {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ExtractedFiles`).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == config.Success) {
          this.ExtractedFiles = data.CDMSFiles;

          this.modalService.open(content);
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

  CustomCDMSFiles(param){
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/CDMSFiles?param=`+ param).subscribe(
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

  public SearchCDMSFiles(param){
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/SearchCDMSFiles?param=` + param).subscribe(
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
}
