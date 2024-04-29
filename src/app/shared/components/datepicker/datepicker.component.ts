import { Component, Input, forwardRef, inject, output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../../custom-material.module';
import moment from 'moment';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CustomMaterialModule,ReactiveFormsModule],

  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
  ]
})
export class DatepickerComponent implements ControlValueAccessor {
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
  private setTodayDate() {
    const today = new Date();
    this.dateFormControl.setValue(today);
    this.changeDate.emit(moment(today).format());
  }
}
