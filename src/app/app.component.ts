import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({
    myReactiveControl: new FormControl('option-3', [Validators.required]),
    myReactiveControlTwo: new FormControl('option-2')
  });

  myControlReactive = new FormControl('option-2', [Validators.required]);

  myControlTemplate = 'option-2';
  normalDataBinding = 'option-2';

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

  onSubmit(value) {
    console.log(value);
  }

  onDataChange(value) {
    console.log('data change', value);
    this.normalDataBinding = value;
  }

  updateValue(newValue) {
    this.myControlTemplate = newValue;
    this.normalDataBinding = newValue;
    this.myControlReactive.patchValue(newValue);
    this.form.get('myReactiveControl').patchValue(newValue);
  }
}
