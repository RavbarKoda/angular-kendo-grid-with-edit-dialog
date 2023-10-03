import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <app-eml-predal-list>  
  </app-eml-predal-list>
    `,
})
export class AppComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}
}
