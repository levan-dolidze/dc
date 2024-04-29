import { Component, OnInit, effect, inject } from '@angular/core';
import { CustomMaterialModule } from '../../../shared/custom-material.module';
import { TableComponent } from '../../../shared/components/table/table.component';
import { TableColumnConfig } from '../../../shared/utils/culomn.config';
import { SourceService } from '../data-access/source.service';
import { CustomDatepickerComponent } from '../../../shared/components/custom-datepicker/custom-datepicker.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/input/input.component';
import { createSearch } from '../../../shared/functions/create-search';
import { getCalendarEndDate } from '../../../shared/functions/dayToDate';
import { CustomDatepickerHelperService } from '../../../shared/components/custom-datepicker/custom-datepicker-helper.service';
import { MonthDay, WorkingDays } from '../utils/models';

export type CalcualtionForm = {
  startDate: FormControl<Date>,
  endDate: FormControl<Date>,
  calendarDays: FormControl<number>,
  calendarDaysDate: FormControl<Date>,
  amount: FormControl<number>,


}
@Component({
  selector: 'app-decree-calc',
  standalone: true,
  imports: [CustomMaterialModule, TableComponent,
            CustomDatepickerComponent,ReactiveFormsModule, TextInputComponent],
  templateUrl: './decree-calc.component.html',
  styleUrl: './decree-calc.component.scss'
})
export class DecreeCalcComponent implements OnInit {

  constructor() {
    effect(() => {
      this.getData()
    });
  }

  form = new FormGroup<CalcualtionForm>({
    startDate: new FormControl(),
    endDate: new FormControl(null),
    calendarDays: new FormControl(null),
    calendarDaysDate: new FormControl(null),
    amount: new FormControl(null)
  })

  displayedColumns!: TableColumnConfig[];

  readonly sourseService = inject(SourceService)
  readonly HelperService = inject(CustomDatepickerHelperService)
  ui = this.sourseService.dataVal;


  // calendarDaysDate$ = createSearch(this.f.calendarDays);
  startDate$ = createSearch(this.f.startDate);
  endDate$ = createSearch(this.f.endDate);
  amount$ = createSearch(this.f.amount);

  ngOnInit(): void {
    this.sourseService.getData()
    this.getData()

    // this.calendarDaysDate$.subscribe((calendarDaysDate) => {
    //   if (calendarDaysDate) {
    //     // let end = getCalendarEndDate(+calendarDaysDate)
    //     // console.log(end)
    //     // this.f.calendarDaysDate.setValue(end)
    //   }
    // });

    this.startDate$.subscribe((startDate) => {
      if (startDate) {
        let end = getCalendarEndDate(+this.f.calendarDays.value, this.f.startDate.value)
        this.f.calendarDaysDate.setValue(end)
        this.f.endDate.setValue(end)
      }
    })

    this.endDate$.subscribe((endDate) => {
      if (endDate) {
        const m = this.HelperService.getMonthNames(this.f.startDate.value, endDate);
        this.sourseService.updateData(m, 'month')

        const d: WorkingDays = this.HelperService.getWorkingDays(this.f.startDate.value, endDate)

        this.sourseService.updateData(d.workingDays.map((x: MonthDay) => x.days), 'workingDays')

        const firstDayOfMonth = this.HelperService.getFirstDayOfMonth(this.f.startDate.value);
        const endDayOfMonth = this.HelperService.getLastDayOfMonth(endDate)

        const ds = this.HelperService.getWorkingDays(firstDayOfMonth, endDayOfMonth)
        this.sourseService.updateData(ds.workingDays.map((x: MonthDay) => x.days), 'workingDaysInMonth')
      }
    })

    this.amount$.subscribe((amount) => {

      const averageAmount = this.HelperService.getAverageAmount(amount, this.ui().workingDaysInMonth)

      this.sourseService.updateData(averageAmount, 'avarageSalary')

      const total = this.HelperService.getTotalAmount(amount, this.ui().workingDaysInMonth, this.ui().workingDays)

      this.sourseService.updateData(total, 'amount')

      let totalAmount = this.HelperService.getTotal(total);
      let totalworkingDays = this.HelperService.getTotal(this.ui().workingDays);

      this.sourseService.updateData(totalworkingDays, 'totalworkingDays')
      this.sourseService.updateData(totalAmount, 'totalAmount')


    })
  }

  get f(): CalcualtionForm {
    return this.form.controls
  }


  getData(): void {

    this.displayedColumns = [
      {
        title: 'თვე',
        getData: this.ui().month,
        sequence: 0
      },
      {
        title: ' საშ. დღე ხელფ.',
        getData: this.ui().avarageSalary,
        sequence: 1
      },
      {
        title: 'სამუშაო დღეების რაოდ',
        getData: this.ui().workingDaysInMonth,
        sequence: 3
      },
      {
        title: 'გაცდენილი დღეების რაოდ.',
        getData: this.ui().workingDays,
        sequence: 2
      },
      {
        title: 'თანხა',
        getData: this.ui().amount,
        sequence: 4
      },
      {
        title: 'სულ სამუშაო დღეები',
        getData: this.ui().totalworkingDays,
        sequence: 5
      },
      {
        title: 'სულ თანხა',
        getData: this.ui().totalAmount,
        sequence: 6
      },

    ]
  }









  onStartChange(e: Date) {
    this.f['startDate'].setValue(e)
  }

  onEndChange(e: Date) {
    this.f['endDate'].setValue(e)
  }

  onSubmit() {
    console.log(this.form.getRawValue())
  }
}
