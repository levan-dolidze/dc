import { Component, Input, OnInit, forwardRef, inject, output } from '@angular/core';
import { CustomMaterialModule } from '../../custom-material.module';
import moment from 'moment';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

export type CustomDateForm = {
  date: FormControl<string | Date>
};
@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [CustomMaterialModule, ReactiveFormsModule,NgOptimizedImage],
  templateUrl: './custom-datepicker.component.html',
  styleUrl: './custom-datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true
    },
  ]
})
export class CustomDatepickerComponent implements OnInit, ControlValueAccessor {

  fb = inject(FormBuilder)
  onChange: Function;
  onTouch: Function;

  @Input() control: any
  @Input() placeholder: string;
  @Input() matDatePicker: boolean = false;
  @Input() min: Date | string
  @Input() max: Date;
  @Input() isDisabled: boolean = false;
  @Input() isReadonly: boolean = true;
  @Input() removeDisableColor: boolean = false;
  @Input() defaultDate: Date;
  @Input() isDefaultDate: boolean = false
  @Input() isEditable: boolean = true;
  @Input() date: string | Date = '';

  changeDate = output<any>()
  isOpen: boolean;

  value: string | Date


  form = this.fb.group({
    date: [this.date]

  })



  ngOnInit(): void {


    // this.getIcon()

    // this.disableField(this.isDisabled)

    // this.helper.setToday$.subscribe((value) => {
    //   if (value == 'clicked') {
    //     this.setTodayDate()
    //     this.helper.setToday('')
    //   }
    // })
  }



  get dateFormControl(): AbstractControl {
    return this.form.controls['date'];
  }
  dateChanged(): void {
    this.changeDate.emit(moment(this.dateFormControl.value).format())
  }

  writeValue(value: Date): void {
    this.form.controls['date'].setValue(value)
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  datepickerClosed() {
    this.isOpen = false
  }
  datepickerOpened() {
    this.isOpen = true
  }
}
