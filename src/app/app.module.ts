import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { Step1Component } from './Step 1/step1.component'
import { Step2Component } from './Step 2/step2.component';
import { Step3Component } from './Step 3/step3.component';
import { Step4Component } from './Step 4/step4.component';
import { PopupComponent } from './Custom Components/popup.component';
import { ErrorComponent } from './Custom Components/error.component';

const appRoutes: Routes = [
  { path: '', component: Step1Component, pathMatch: 'full' },
  { path: 'Step1', component: Step1Component, pathMatch: 'full' },
  { path: 'Step2', component: Step2Component, pathMatch: 'full' },
  { path: 'Step3', component: Step3Component, pathMatch: 'full' },
  { path: 'Step4', component: Step4Component, pathMatch: 'full' },
  { path: '**', component: ErrorComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    PopupComponent,
    ErrorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BootstrapModalModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot()
  ],
  entryComponents: [
    PopupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
