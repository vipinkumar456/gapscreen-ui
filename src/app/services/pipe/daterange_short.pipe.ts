import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'dateRangeShort'
})

export class DateRangeSortTextPipe implements PipeTransform {
  transform(value: any): any {
    if(value){
      // let date = moment(value[0]).format("DD-MM-YYYY") + ', ' + moment(value[1]).format("DD-MM-YYYY")
      let date = moment(value[0]).format("MMMM YY") + ' - ' + moment(value[1]).format("MMMM YY")
      return date
    }
  }
}