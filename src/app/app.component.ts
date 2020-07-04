import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

function customValidator(option: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isInvalidOption = control.value === option;

    return isInvalidOption ? { custom: { value: 'This option is not allowed.' }} : null;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myControlReactive = new FormControl('', Validators.compose(
    [Validators.required, customValidator('option-2')]
  ));
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
