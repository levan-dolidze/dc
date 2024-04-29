import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor() { }
  readonly #source = signal<any>([])
  readonly dataVal = computed(this.#source)


  data = signal(
    {
      month: [],
      avarageSalary: [0],
      workingDays: [0],
      workingDaysInMonth: [0],
      amount: [0],
      totalAmount: [0],
      totalworkingDays: [0],
    }
  )
  getData() {
    this.#source.update(this.data)
    return this.dataVal
  }

  updateData(params: any, key: string) {
    this.#source.update((x) => {
      const { param, ...rest } = x;
      return { ...rest, [key]: params };
    });
    console.log(this.#source())
  }



}
