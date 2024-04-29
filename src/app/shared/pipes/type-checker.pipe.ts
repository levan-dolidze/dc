import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeChecker',
  standalone: true
})
export class TypeCheckerPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return typeof value === 'number'
  }

}
