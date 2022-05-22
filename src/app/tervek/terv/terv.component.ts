import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Input, OnInit } from '@angular/core'
import { formatHungarianTime } from 'src/app/date-adaptor'
import { Foglalkozas, Terv } from 'src/app/models/foglalkozas'

const minutesToMillis = 60 * 1000

@Component({
    selector: 'app-terv',
    templateUrl: './terv.component.html',
    styleUrls: ['./terv.component.scss']
})
export class TervComponent implements OnInit {

    @Input() start!: Date
    @Input() terv!: Terv

    constructor() { }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.terv.foglalkozasok, event.previousIndex, event.currentIndex)
    }

    computeStartTime(foglalkozas: Foglalkozas): Date {
        let timeMillis = this.start.getTime()
        const foglalkozasIndex = this.terv.foglalkozasok.findIndex(f => f === foglalkozas)
        for (let i = 0; i < foglalkozasIndex; ++i) {
            timeMillis += this.terv.foglalkozasok[i].duration * minutesToMillis
        }
        return new Date(timeMillis)
    }

    computeEndTime(foglalkozas: Foglalkozas): string {
        return formatHungarianTime(new Date(this.computeStartTime(foglalkozas).getTime() + foglalkozas.duration * minutesToMillis))
    }
}
