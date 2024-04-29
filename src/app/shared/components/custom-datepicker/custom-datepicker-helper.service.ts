import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { WorkingDays } from '../../../features/decree-calc/utils/models';

@Injectable({
  providedIn: 'root'
})
export class CustomDatepickerHelperService {

  constructor(private datePipe: DatePipe) { }


  restDays = [
    {
      month: 0,
      restDay: 2,
      dates: [new Date('01/01/2024'), new Date('01/02/2024'),
      new Date('01/07/2024'), new Date('01/19/2024')
      ]
    },
    {
      month: 1,
      restDay: 0,
      dates: []
    },
    {
      month: 2,
      restDay: 1,
      dates: [new Date('03/03/2024')]
    },
    {
      month: 3,
      restDay: 1,
      dates: [new Date('04/09/2024')]

    },
    {
      month: 4,
      restDay: 3,
      dates: [new Date('05/09/2024'), new Date('05/26/2024'), new Date('05/12/2024')]
    },
    {
      month: 5,
      restDay: 0,
      dates: []
    },
    {
      month: 6,
      restDay: 0,
      dates: []
    },
    {
      month: 7,
      restDay: 1,
      dates: [new Date('08/28/2024')]
    },
    {
      month: 8,
      restDay: 0,
      dates: []
    },
    {
      month: 9,
      restDay: 1,
      dates: [new Date('10/14/2024')]
    },
    {
      month: 10,
      restDay: 0,
      dates: [new Date('11/23/2024')]
    },
    {
      month: 11,
      restDay: 0,
      dates: []
    },
  ]

  public getWorkingDays(startDate: Date, endDate: Date, workingDaysInMonth?: Date): WorkingDays {
    let totalDays = 0;
    let workingDays = [];
    let currentMonth = null;
    let currentmIndex = -1;
    let currentDate = new Date(startDate);

    while (!workingDaysInMonth ? (currentDate <= endDate) : (currentDate <= workingDaysInMonth)) {
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        totalDays++
        const mIndex = currentDate.getMonth();
        if (mIndex !== currentmIndex) {
          currentmIndex = mIndex;
          currentMonth = {
            month: currentDate.toLocaleString('default', { month: 'long' }),
            days: 0
          };
          for (let i = 0; i < this.restDays[mIndex].dates.length; i++) {
            if (this.restDays[mIndex].dates[i] && this.restDays[mIndex].dates[i].getTime() >= currentDate.getTime() &&
              this.restDays[mIndex].dates[i].getTime() <= endDate.getTime()
            ) {
              currentMonth.days--
            }
          }
          workingDays.push(currentMonth);
        }
        currentMonth.days++
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return { totalDays, workingDays };
  };

  public getMonthNames(startDate: Date, endDate: Date): string[] {
    const monthNames: string[] = [];
    let currentDate = new Date(startDate);
    const endDatePlusOneMonth = new Date(endDate);
    endDatePlusOneMonth.setMonth(endDatePlusOneMonth.getMonth() + 1);

    while (currentDate < endDatePlusOneMonth) {
      const monthName = this.datePipe.transform(currentDate, 'MMMM');
      monthNames.push(monthName);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return monthNames;
  }

  public getFirstDayOfMonth(date: Date) {
    let day = new Date(date)
    return new Date(day.getFullYear(), day.getMonth(), 1);
  }
  public getLastDayOfMonth(date: Date) {
    let day = new Date(date);
    return new Date(day.getFullYear(), day.getMonth() + 1, 0);
  }


  public getAverageAmount(totalAmount: number, workingDaysInMonth: number[]) {
    let arr = []
    for (let index = 0; index < workingDaysInMonth.length; index++) {
      let val = totalAmount / workingDaysInMonth[index]
      arr.push(val)
    }
    return arr
  }
  public getTotalAmount(totalAmount: number, workingDaysInMonth: number[], workingDays: number[]): number[] {
    let arr = []
    for (let index = 0; index < workingDaysInMonth.length; index++) {
      let val = (totalAmount / workingDaysInMonth[index]) * workingDays[index]
      arr.push(val)
    }
    return arr
  }

 public getTotal(array: number[]) {

    let result = 0

    function helper(helperInput: number[]) {

      if (helperInput.length === 0) return;

      result += helperInput[0]

      helper(helperInput.slice(1))
    }

    helper(array)
    return [result]
  }
}
