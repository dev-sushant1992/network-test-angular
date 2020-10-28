import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netowrk-test';

  constructor(private appService: AppService) {
    this.appService.networkChangeObservable.subscribe(console.log);
  }
}
