import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand'
})

export class ThousandPipe implements PipeTransform {
  transform(value: any, digits?: string): string {
    if (value) {
        
        value=value.toString();
        let x=value.split('.');
        let val=x[0]
        let deci=x[1];
        var lastThree = val.substring(val.length-3);
        var otherNumbers = val.substring(0,val.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree+'.'+(deci?deci:"00");
        return res;
    //   let thousands = value.split(',');
    //   const preDecimalValue = thousands.pop();
    //   thousands = thousands.join('');
    //   return thousands + ' ' + preDecimalValue;
    }
    return '';
  }
}
