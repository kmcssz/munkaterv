import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { formatHungarianTime } from 'src/app/date-adaptor'
import { computeConsumedDuration, computeElapsedBeforeDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { CsoportType, Layout, Szemszog } from 'src/app/models/csapat'
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

    Layout = Layout

    editable$!: Observable<boolean>
    layout$: Observable<Layout>

    constructor(
        public fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) public szemszog$: Observable<Szemszog>,
    ) {
       this.layout$ = this.szemszog$.pipe(map(szemszog => szemszog.layout))
    }

    ngOnInit(): void {
        this.editable$ = this.szemszog$.pipe(
            map(szSz => canEditTerv(szSz.csoport.type, this.terv.type as FoglalkozasType))
        )
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.terv.foglalkozasok, event.previousIndex, event.currentIndex)
        this.fogSor.putFoglalkozas(this.terv)
    }

    computeStartTime(children: Foglalkozas[], uuid: string): Date {
        const durationBefore = computeElapsedBeforeDuration(children, uuid)
        return new Date(this.start.getTime() + durationBefore * minutesToMillis)
    }

    translateAfterTime(children: Foglalkozas[], foglalkozas: Foglalkozas): string {
        const beforeDuration = computeElapsedBeforeDuration(children, foglalkozas.uuid)
        return formatHungarianTime(new Date(this.start.getTime() + (beforeDuration + foglalkozas.duration) * minutesToMillis))
    }

    delete(foglalkozas: Foglalkozas) {
        this.fogSor.deleteFoglalkozas(foglalkozas, this.terv)
    }
}

function canEditTerv(csoportType: CsoportType, foglalkozasType: FoglalkozasType): boolean {
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
