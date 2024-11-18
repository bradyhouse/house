import {Component} from "@angular/core";
import { OnDestroy } from "@angular/core";

@Component({
    selector: 'app-full-width-grid',
    templateUrl: 'date.component.html',
    styleUrls: ['date.component.css'],
})
export class DateComponent implements OnDestroy {
    date: any = new Date();
    params: any = {};
    dd: string = '';
    mm: string = '';
    yyyy: string = '';



    ngOnDestroy() {
        console.log(`Destroying DateComponent`);
    }

    onResetDate() {
        this.dd = '';
        this.mm = '';
        this.yyyy = '';
        this.date = null;
        this.params.onDateChanged();
    }

    onDateChanged(on: string, newValue: string) {
        this.date = this.parseDate(
            on === 'dd' ? newValue : this.dd,
            on === 'mm' ? newValue : this.mm,
            on === 'yyyy' ? newValue : this.yyyy
        );
        this.params.onDateChanged();
    }

    getDate(): Date {
        return this.date;
    }

    setDate(date: Date): void {
        this.dd = date.getDate() + '';
        this.mm = (date.getMonth() + 1) + '';
        this.yyyy = date.getFullYear() + '';
        this.date = date;
        this.params.onDateChanged();
    }

    parseDate(dd: any, mm: any, yyyy: any) {
        if (dd.trim() === '' || mm.trim() === '' || yyyy.trim() === '') {
            return null;
        }

        let day: number = Number(dd);
        let month: number = Number(mm);
        let year: number = Number(yyyy);

        let date: Date = new Date(year, month - 1, day);

        if (isNaN(date.getTime())) {
            return null;
        }

        if (date.getDate() != day || date.getMonth() + 1 != month || date.getFullYear() != year) {
            return null;
        }

        return date;
    }
}
