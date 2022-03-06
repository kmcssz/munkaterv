import { Component, Inject, OnInit } from '@angular/core'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { CSAPATOK } from '../models/beosztas'
import { Csapat } from '../models/csapat'
import { Munkaterv } from '../models/foglalkozas'
import { formatHungarianDateTime } from '../date-adaptor'
import dateFormat, { masks } from 'dateformat'

export interface NewMunkatervDialogData {
    date: Date
    time: string
}

@Component({
    selector: 'app-csapat-tervek',
    templateUrl: './csapat-tervek.component.html',
    styleUrls: ['./csapat-tervek.component.scss'],
})
export class CsapatTervekComponent implements OnInit {

    csapat!: Csapat
    munkatervek: Munkaterv[] = []
    formatHungarianDateTime = formatHungarianDateTime

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        const name = this.route.snapshot.paramMap.get('name')!
        this.csapat = CSAPATOK.find((csapat) => csapat.name == name)!
    }

    addNewMunkaterv(): void {
        const sevenDaysMillies = 604800000
        const nextDate = this.munkatervek.length > 0
            ? new Date(this.munkatervek[0].start.getTime() + sevenDaysMillies)
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
            this.munkatervek.push(new Munkaterv(selectedDateTime))
            this.munkatervek.sort((mtA, mtB) => mtB.start.getTime() - mtA.start.getTime())
        });
    }

    getLink(munkaterv: Munkaterv): string {
        return `/csapat/${this.csapat.name}/munkaterv/${munkaterv.start.getTime()}`
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
