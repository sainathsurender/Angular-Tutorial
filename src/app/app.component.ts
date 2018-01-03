import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{ 

  activeli ='1';

  public clickevent(id){
    this.activeli = id;
  }
}
