import { Component } from '@angular/core';

import { ExecutionStatusListDto } from './execution-status-list-dto';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html'
})
export class Step4Component {
  model: Array<ExecutionStatusListDto> = [
    {FundName:'uti',FundCode:'108',BatchDate:'12/21/2017',LogStatus:'Started',DateCreated:'12/22/2017' },
  ];
}
