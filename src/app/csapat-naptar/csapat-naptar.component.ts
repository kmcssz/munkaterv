import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Csapat } from '../models/csapat'
import { formatHungarianDateTime } from '../date-adaptor'
import dateFormat from 'dateformat'
import { CsoportService } from '../services/csoport.service'
import { createTerv, FoglalkozasType, Munkaterv } from '../models/foglalkozas'
import { FoglalkozasService } from '../services/foglalkozas.service'

export interface NewMunkatervDialogData {
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
    munkatervek: Munkaterv[] = []

    constructor(
        private fogSor: FoglalkozasService,
        private csopSor: CsoportService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.csapat = this.csopSor.getCsapat()
    }

    addNewMunkaterv(): void {
        const sevenDaysMillies = 604800000
        const nextDate = this.munkatervek.length > 0
            ? new Date(this.munkatervek[0].start + sevenDaysMillies)
            : new Date() // Today :)

        const dialogData: NewMunkatervDialogData = {
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
            this.munkatervek.push({
                start: selectedDateTime.getTime(),
                csapatTervUuid: this.fogSor.putFoglalkozas(createTerv(FoglalkozasType.CsapatTerv, this.csapat.name, 120)),
            })
            this.munkatervek.sort((mtA, mtB) => mtB.start - mtA.start)
        });
    }

    getLink(munkaterv: Munkaterv): string {
        return `/csapat/${this.csapat.name}/munkaterv/${munkaterv.start}`
    }

    formatHungarianStartTime(start: number): string {
        return formatHungarianDateTime(new Date(start))
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
