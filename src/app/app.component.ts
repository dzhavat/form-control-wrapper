import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myControlReactive = new FormControl('');
  myControlTemplate = '';

  options = [
    {
      value: 'option-1',
      viewValue: 'Option 1'
    },
    {
      value: 'option-2',
      viewValue: 'Option 2'
    },
    {
      value: 'option-3',
      viewValue: 'Option 3'
    }
  ];
}
