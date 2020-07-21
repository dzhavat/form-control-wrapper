import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-wrapper',
  templateUrl: './select-wrapper.component.html',
  styleUrls: ['./select-wrapper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectWrapperComponent,
      multi: true
    },
  ]
})
export class SelectWrapperComponent implements ControlValueAccessor {
  @Input() options: any[];

  private internalValue: string | undefined;

  @Input()
  get value() {
    return this.internalValue;
  }
  set value(newValue) {
    this.internalValue = newValue;
  }

  @Output() valueChange = new EventEmitter();

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor() {}

  writeValue(newValue: string | undefined): void {
    this.value = newValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onSelectionChange({ value }: MatSelectChange) {
    this.value = value;
    this.onChange(value);
    this.onTouch();
    this.valueChange.emit(value);
  }
}
