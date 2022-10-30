import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Csapat } from '../models/csapat'
import { formatHungarianFullDate, formatHungarianDateTime, formatHungarianTime, formatHungarianDate, formatHungarianWeekday } from '../date-adaptor'
import dateFormat from 'dateformat'
import { CsoportService } from '../services/csoport.service'
import { buildDate, createTerv, Esemeny, FoglalkozasType, getDatePart } from '../models/foglalkozas'
import { FoglalkozasService } from '../services/foglalkozas.service'
import { EsemenyService } from '../services/esemeny.service'
import { map, Observable } from 'rxjs'
import { parseHostBindings } from '@angular/compiler'

export interface NewMunkatervDialogData {
    name: string
    date: Date
    time: string
}

@Component({
    selector: 'app-csapat-naptar',
    templateUrl: './csapat-naptar.component.html',
    styleUrls: ['./csapat-naptar.component.scss'],
})
export class CsapatNaptarComponent implements OnInit {

    csapat!: Csapat
    esemenyek$: Observable<Esemeny[]>

    constructor(
        private fogSor: FoglalkozasService,
        private csopSor: CsoportService,
        private esemenySor: EsemenyService,
        public dialog: MatDialog,
    ) {
        this.esemenyek$ = this.esemenySor.esemenyek$.pipe(
            map(esemenyek => esemenyek.sort((e1, e2) => Date.parse(e2.date) - Date.parse(e1.date))),
        )
    }

    ngOnInit(): void {
        this.csapat = this.csopSor.getCsapat()
        this.esemenySor.initilize(this.csapat.name)
    }

    addNewEsemeny(esemenyek: Esemeny[]): void {
        const sevenDaysMillies = 604800000
        const nextDate = esemenyek.length > 0
            ? new Date(Date.parse(esemenyek[0].date) + sevenDaysMillies)
            : new Date() // Today :)

        const dialogData: NewMunkatervDialogData = {
            name: 'Cserkészfoglalkozás',
            date: nextDate,
            time: dateFormat(nextDate, 'HH:MM'),
        }
        this.dialog.open(NewMunkatervDialog, {
            data: dialogData,
        }).afterClosed().subscribe((data: NewMunkatervDialogData) => {

            const date = getDatePart(data.date)
            this.esemenySor.addEsemeny({
                date,
                name: data.name,
            })

            this.fogSor.initilize(this.csapat.name, date)
            this.fogSor.putFoglalkozas(createTerv(FoglalkozasType.CsapatTerv, this.csapat.name, 120))
        });
    }

    getLink(munkaterv: Esemeny): string {
        return `/csapat/${this.csapat.name}/munkaterv/${munkaterv.date}`
    }

    formatHungarianStartDate(date: string): string {
        return formatHungarianDate(buildDate(date))
    }

    formatHungarianStartWeekday(date: string): string {
        return formatHungarianWeekday(buildDate(date))
    }

    getTense(esemeny: Esemeny) {
        const oneDayinMillis = 86436000

        const startOfToday = new Date()
        startOfToday.setHours(0)

        const esemenyDate = Date.parse(esemeny.date)
        if (esemenyDate < startOfToday.getTime()) {
            return 'passed'
        }

        const endOfToday = new Date()
        endOfToday.setHours(23, 59, 59, 999)

        return esemenyDate < endOfToday.getTime() ? 'present' : 'future'
    }
}

@Component({
    selector: 'new-munkaterv-dialog',
    templateUrl: './new-munkaterv-dialog.html',
    styleUrls: ['./new-munkaterv-dialog.scss'],
})
export class NewMunkatervDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: NewMunkatervDialogData,
    ) {
    }
}
