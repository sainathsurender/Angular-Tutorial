import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Step1Component } from './step1.component';
import { Step2Component } from './step2.component';
import { Step3Component } from './step3.component';
import { Step4Component } from './step4.component';
import { PopupComponent } from './popup.component';
import { ErrorComponent } from './error.component';

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
    BootstrapModalModule
  ],
  entryComponents: [
    PopupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
