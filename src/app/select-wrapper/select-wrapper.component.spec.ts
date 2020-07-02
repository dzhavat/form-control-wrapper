import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SelectWrapperComponent } from './select-wrapper.component';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatOption } from '@angular/material/core';

describe('SelectWrapperComponent', () => {
  function setup(template: string) {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    @Component({
      template,
    })
    class TestHostComponent {
      testControlReactive = new FormControl('');
      testControlTemplate = '';
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

      onValueChange(value: string | undefined) {
        return value;
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        SelectWrapperComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        NoopAnimationsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    function getComponent(componentToSelect: any) {
      return fixture.debugElement.query(By.directive(componentToSelect));
    }

    return {
      fixture,
      component,
      getComponent,
    };
  }

  describe('with Reactive approach', () => {
    it('has NO selected initial value', () => {
      const template = `
        <app-select-wrapper
          [formControl]="testControlReactive"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { component, getComponent } = setup(template);

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlReactive.value).toBe('');
      expect(selectWrapper.value).toBe('');
    });

    it('has a selected initial value', () => {
      const template = `
        <app-select-wrapper
          [formControl]="testControlReactive"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);

      component.testControlReactive.patchValue('option-2');
      fixture.detectChanges();

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlReactive.value).toBe('option-2');
      expect(selectWrapper.value).toBe('option-2');
    });

    it('can select a different option', () => {
      const template = `
        <app-select-wrapper
          [formControl]="testControlReactive"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { component, getComponent } = setup(template);

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      expect(component.testControlReactive.value).toBe('');

      matSelect.options.last.select();

      expect((matSelect.selected as MatOption).value).toBe('option-3');
      expect(component.testControlReactive.value).toBe('option-3');
    });

    it('can reset the selected option', () => {
      const template = `
        <app-select-wrapper
          [formControl]="testControlReactive"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);

      component.testControlReactive.patchValue('option-2');
      fixture.detectChanges();

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      expect(component.testControlReactive.value).toBe('option-2');

      matSelect.options.first.select();

      expect((matSelect.selected as MatOption)).toBeUndefined();
      expect(component.testControlReactive.value).toBeUndefined();
    });

    fit('shows an error message on reset', () => {
      const template = `
        <app-select-wrapper
          [formControl]="testControlReactive"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);

      component.testControlReactive = new FormControl('option-2', Validators.required);
      fixture.detectChanges();

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      matSelect.open();
      fixture.detectChanges();

      const option = getComponent(MatOption);
      option.triggerEventHandler('click', null);
      fixture.detectChanges();

      const matError: MatError = getComponent(MatError).componentInstance;

      expect(matError).toBeInstanceOf(MatError);
      expect(component.testControlReactive.value).toBeUndefined();
    });
  });

  describe('with Template-driven approach', () => {
    it('has NO selected initial value', fakeAsync(() => {
      const template = `
        <app-select-wrapper
          [(ngModel)]="testControlTemplate"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { component, getComponent } = setup(template);

      tick();

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlTemplate).toBe('');
      expect(selectWrapper.value).toBe('');
    }));

    it('has a selected initial value', fakeAsync(() => {
      const template = `
        <app-select-wrapper
          [(ngModel)]="testControlTemplate"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);

      component.testControlTemplate = 'option-2';
      fixture.detectChanges();

      tick();

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlTemplate).toBe('option-2');
      expect(selectWrapper.value).toBe('option-2');
    }));

    it('can select a different option', () => {
      const template = `
        <app-select-wrapper
          [(ngModel)]="testControlTemplate"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { component, getComponent } = setup(template);

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      expect(component.testControlTemplate).toBe('');

      matSelect.options.last.select();

      expect((matSelect.selected as MatOption).value).toBe('option-3');
      expect(component.testControlTemplate).toBe('option-3');
    });

    it('can reset the selected option', () => {
      const template = `
        <app-select-wrapper
          [(ngModel)]="testControlTemplate"
          [options]="options"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);

      component.testControlTemplate = 'option-2';
      fixture.detectChanges();

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      expect(component.testControlTemplate).toBe('option-2');

      matSelect.options.first.select();

      expect((matSelect.selected as MatOption)).toBeUndefined();
      expect(component.testControlTemplate).toBeUndefined();
    });
  });

  describe('with normal binding', () => {
    it('has NO selected initial value', fakeAsync(() => {
      const template = `
        <app-select-wrapper
          [options]="options"
          [value]="testControlTemplate"
          (valueChange)="onValueChange($event)"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);
      const spy = jasmine.createSpy('valueChange spy');

      component.onValueChange = spy;
      fixture.detectChanges();

      tick();

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlTemplate).toBe('');
      expect(selectWrapper.value).toBe('');
      expect(component.onValueChange).not.toHaveBeenCalled();
    }));

    it('has a selected initial value', fakeAsync(() => {
      const template = `
        <app-select-wrapper
          [options]="options"
          [value]="testControlTemplate"
          (valueChange)="onValueChange($event)"
        ></app-select-wrapper>
      `;

      const { fixture, component, getComponent } = setup(template);
      const spy = jasmine.createSpy('valueChange spy');

      component.testControlTemplate = 'option-2';
      component.onValueChange = spy;
      fixture.detectChanges();

      tick();

      const selectWrapper: SelectWrapperComponent = getComponent(SelectWrapperComponent).componentInstance;

      expect(component.testControlTemplate).toBe('option-2');
      expect(selectWrapper.value).toBe('option-2');
      expect(component.onValueChange).not.toHaveBeenCalled();
    }));

    it('can select a different option', () => {
      const template = `
        <app-select-wrapper
          [options]="options"
          [value]="testControlTemplate"
          (valueChange)="onValueChange($event)"
        ></app-select-wrapper>
      `;

      const { component, getComponent } = setup(template);
      const spy = jasmine.createSpy('valueChange spy');

      component.onValueChange = spy;

      const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

      matSelect.options.last.select();

      expect((matSelect.selected as MatOption).value).toBe('option-3');
      expect(component.onValueChange).toHaveBeenCalledWith('option-3');
    });
  });

  it('can reset the selected option', () => {
    const template = `
        <app-select-wrapper
          [options]="options"
          [value]="testControlTemplate"
          (valueChange)="onValueChange($event)"
        ></app-select-wrapper>
      `;

    const { fixture, component, getComponent } = setup(template);
    const spy = jasmine.createSpy('valueChange spy');

    component.testControlTemplate = 'option-3';
    component.onValueChange = spy;

    fixture.detectChanges();

    const matSelect: MatSelect = getComponent(MatSelect).componentInstance;

    matSelect.options.first.select();

    expect((matSelect.selected as MatOption)).toBeUndefined();
    expect(component.onValueChange).toHaveBeenCalledWith(undefined);
  });
});
