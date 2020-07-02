import { Component, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-wrapper',
  templateUrl: './select-wrapper.component.html',
  styleUrls: ['./select-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWrapperComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectWrapperComponent,
      multi: true
    }
  ]
})
export class SelectWrapperComponent implements ControlValueAccessor, Validator {
  internalControl = new FormControl('');

  @Input() options: any[];

  @Input()
  set value(newValue) {
    this.internalControl.patchValue(newValue);
  }

  @Output() valueChange = new EventEmitter();

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  writeValue(value: string | undefined): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSelectionChange({ value }: MatSelectChange) {
    this.onChange(value);
    this.onTouch(value);
    this.valueChange.emit(value);
    this.changeDetectorRef.markForCheck();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.hasError('required')) {
      this.internalControl.setValidators(Validators.required);
      this.internalControl.updateValueAndValidity();
    }

    return null;
  }
}
