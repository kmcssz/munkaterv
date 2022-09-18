import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Csapat } from '../models/csapat'
import { formatHungarianFullDate, formatHungarianDateTime, formatHungarianTime, formatHungarianDate, formatHungarianWeekday } from '../date-adaptor'
import dateFormat from 'dateformat'
import { CsoportService } from '../services/csoport.service'
import { createTerv, Esemeny, FoglalkozasType } from '../models/foglalkozas'
import { FoglalkozasService } from '../services/foglalkozas.service'
import { EsemenyService } from '../services/esemeny.service'
import { map, Observable } from 'rxjs'

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
            map(esemenyek => esemenyek.sort((e1, e2) => e2.start - e1.start)),
        )
    }

    ngOnInit(): void {
        this.csapat = this.csopSor.getCsapat()
        this.esemenySor.initilize(this.csapat.name)
    }

    addNewEsemeny(esemenyek: Esemeny[]): void {
        const sevenDaysMillies = 604800000
        const nextDate = esemenyek.length > 0
            ? new Date(esemenyek[0].start + sevenDaysMillies)
            : new Date() // Today :)

        const dialogData: NewMunkatervDialogData = {
            name: 'Cserkészfoglalkozás',
            date: nextDate,
            time: dateFormat(nextDate, 'HH:MM'),
        }
        this.dialog.open(NewMunkatervDialog, {
            data: dialogData,
        }).afterClosed().subscribe((data: NewMunkatervDialogData) => {
            const selectedDateTime = new Date(data.date)
            const splitTime = data.time.split(':')
            selectedDateTime.setHours(
                parseInt(splitTime[0]),
                parseInt(splitTime[1]),
            )
            this.esemenySor.addEsemeny({
                start: selectedDateTime.getTime(),
                name: data.name,
            })

            this.fogSor.initilize(this.csapat.name, selectedDateTime.getTime())
            this.fogSor.putFoglalkozas(createTerv(FoglalkozasType.CsapatTerv, this.csapat.name, 120))
        });
    }

    getLink(munkaterv: Esemeny): string {
        return `/csapat/${this.csapat.name}/munkaterv/${munkaterv.start}`
    }

    formatHungarianStartDate(start: number): string {
        return formatHungarianDate(new Date(start))
    }

    formatHungarianStartWeekday(start: number): string {
        return formatHungarianWeekday(new Date(start))
    }

    formatHungarianStartTime(start: number): string {
        return formatHungarianTime(new Date(start))
    }

    getTense(esemeny: Esemeny) {
        const oneDayinMillis = 86436000
        return (esemeny.start + oneDayinMillis) < Date.now() ? 'passed' : 'future'
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
