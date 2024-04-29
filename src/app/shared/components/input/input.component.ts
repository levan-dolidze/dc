import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Injector, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation, forwardRef, isDevMode } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NgControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomMaterialModule } from '../../custom-material.module';
export interface FocusBlurAction {
  onFocus: boolean,
  event: Event|undefined
}


export class CustomFieldErrorMatcher {
  constructor(private customControl: FormControl, private errors: any) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.customControl && (this.customControl.dirty && this.customControl.invalid)
  }
}



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [CustomMaterialModule,ReactiveFormsModule,FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ],

})
export class TextInputComponent implements AfterViewInit, OnChanges, ControlValueAccessor {

  @Input() value: string;


  @Input() isDisabled: any;
  @Input() clickableDisable: boolean = false
  @Input() type: string;
  @Input() placeholder: string;
  @Input() placeholderOnDisable: string;
  @Input() maxlength: number;
  @Input() minlength: number;
  @Input() max: number;
  @Input() min: number;
  @Input() readonly = false;
  @Input() autofocus = false;
  @Input() isValueSelected = false;
  @Input() maskValue: string;
  @Input() isRequired: boolean = false;
  @Input() isSelect: boolean;
  @Input() isTip: boolean | string
  @Input() tipTxt: string;
  @Input() tipQTY: number = 1
  @Input() removeFocus: boolean = false;
  @Input() removeDisableColor: boolean = false;
  @Input() isInvalid: boolean = false;

  @Output() focusChanged = new EventEmitter<FocusBlurAction>();
  @Output() clickEv = new EventEmitter<any>();
  @Output() clickOut = new EventEmitter<any>();

  @HostBinding('class.no-validate') @Input() novalidate: boolean;

  @ViewChild('input') input: ElementRef;
  @ViewChild('inputEl') inputEl: ElementRef;

  constructor(private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    public injector: Injector,
    private eRef: ElementRef,


  ) {
    this.readonly = false;
  }



  private onModelChange = (_: any) => {
  };


  propagateTouched = (value: boolean) => {
  };

  control: FormControl;
  @Input() errors: any = null;
  ngAfterViewInit(): void {
    if (this.autofocus) {
      setTimeout(() => {
        this.focus();
      }, 100);
    }

    const ngControl: any = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
      })
    }

  }


  onRemoveFocus() {
    if (this.removeFocus && this.inputEl) {
      this.inputEl.nativeElement.blur()
    }
    return
  };

  ngOnChanges(changes: SimpleChanges) {
    this.onRemoveFocus();
    if (changes['isInvalid']) {
      console.log("EROR", this.isInvalid)
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

    // this.isDisabled = isDisabled;

  }

  updateModel(): void {
    this.onModelChange(this.value);
  }


  focus(): void {
    if (this.inputEl) {
      this.inputEl?.nativeElement.focus();
    }
  }

  onFocusChanged(focused: boolean, event?: Event): void {
    this.focusChanged.emit({ onFocus: focused, event: event });

    if (!focused) {
      this.propagateTouched(true);
    }
  }

  errorMatcher() {
    return new CustomFieldErrorMatcher(this.control, this.errors)
  }

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => (ctrl && ctrl.invalid)
  };


  onClick(event: Event) {

    if (!this.isDisabled) {
      this.clickEv.emit(event)
    }
    return
  }




}
