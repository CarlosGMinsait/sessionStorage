import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appKeys',
})
export class KeysPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return Object.keys(value);
  }

}
