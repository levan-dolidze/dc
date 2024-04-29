import { Injectable, computed, signal } from '@angular/core';

export type DecreeData = {
  month: string[],
  avarageSalary: number[],
  workingDays: number[],
  workingDaysInMonth: number[],
  amount: number[],
  totalAmount: number[],
  totalworkingDays: number[],
}
@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor() { }
  readonly #source = signal<any>([])
  readonly dataVal = computed(this.#source)


  private data = signal(
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
  public getData() {
    this.#source.update(this.data)
    return this.dataVal
  }

  public updateData(params: any[], key: string) {
    this.#source.update((x) => {
      const { param, ...rest } = x;
      return { ...rest, [key]: params };
    });
  }
}
