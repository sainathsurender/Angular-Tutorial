import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ 

  activeli ='listep1';

  public clickevent(event){
    let lictrl = event.target.id.replace("anc","li");
    this.activeli = lictrl;
  }
}
