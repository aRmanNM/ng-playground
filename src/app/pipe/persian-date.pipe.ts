import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'persianDate'
})

export class PersianDatePipe implements PipeTransform {
    transform(value?: Date, showTime: boolean = true, ...args: any[]): any {
        if (value == null)
            return;

        if (showTime)
            return `${value.toLocaleDateString("fa-IR")} ${value.toLocaleTimeString("fa-IR")}`;
        else
            return `${value.toLocaleDateString("fa-IR")}`;
    }
}