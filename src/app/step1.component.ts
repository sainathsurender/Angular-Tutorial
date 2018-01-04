import { Component, OnInit } from '@angular/core';

import { CDMSService } from './cdms-service';
import { PopupComponent } from './popup.component';
import { config } from './app.config';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  providers: [CDMSService]
})
export class Step1Component implements OnInit {

  constructor(private objCDMSService: CDMSService) { }
  CDMSFile = [];
  ExtractedFiles = [];
  ShowLoader = false;
  ShowSuccessMessage = false;
  SuccessMessage;
  ShowErrorMessage = false;
  ErrorMessage;

  ngOnInit() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/CDMSFiles`).subscribe(
      data => {
      if(data != undefined && data.ResponseStatus == 1){
        this.CDMSFile = data;
      }
      this.ShowLoader = false;
      })
  }

  ViewExtractedFiles() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ExtractedFiles`).subscribe(
      data => {
        if(data != undefined && data.ResponseStatus == 1){
          this.ExtractedFiles = data
        }
        this.ShowLoader = false;
      })
  }

  ExtractFile(filename) {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ExtractFile?archiveFilenameIn=` + filename).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == 1) {
          this.ShowSuccessMessage = true;
          this.SuccessMessage = "Files extracted successfully for " + filename;
        }
        else {
          this.ShowErrorMessage = true;
          this.ErrorMessage = "Unable to extract for " + filename;
        }

        this.ShowLoader = false;
      });
  }

  ClearFiles() {
    this.ShowLoader = true;
    this.objCDMSService.get(config.APIPath + `/ClearFiles`).subscribe(
      data => {
        if (data != undefined && data.ResponseStatus == 1) {
          this.ShowSuccessMessage = true;
          this.SuccessMessage = "Files cleared successfully.";
        }
        else {
          this.ShowErrorMessage = true;
          this.ErrorMessage = "Unable to clear files.";
        }

        this.ShowLoader = false;
      })
  }
}
