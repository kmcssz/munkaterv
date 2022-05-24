import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { formatHungarianTime } from 'src/app/date-adaptor'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { CsoportType, Szemszog } from 'src/app/models/csapat'
import { Foglalkozas, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'

const minutesToMillis = 60 * 1000

@Component({
    selector: 'app-terv',
    templateUrl: './terv.component.html',
    styleUrls: ['./terv.component.scss']
})
export class TervComponent implements OnInit {

    @Input() start!: Date
    @Input() terv!: Terv

    draggable$!: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) public szemszog$: Observable<Szemszog>,
    ) {
    }

    ngOnInit(): void {
        this.draggable$ = this.szemszog$.pipe(
            map(szSz => canDragTerv(szSz.csoport.type, this.terv.type))
        )
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

function canDragTerv(csoportType: CsoportType, foglalkozasType: FoglalkozasType): boolean {
    return csoportType === CsoportType.Csapat && [
            FoglalkozasType.CsapatTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Raj && [
            FoglalkozasType.RajTerv,
        ].includes(foglalkozasType) ||

        csoportType === CsoportType.Ors && [
            FoglalkozasType.OrsiTerv,
        ].includes(foglalkozasType)
}
