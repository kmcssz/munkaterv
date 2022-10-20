import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, Input } from '@angular/core'
import { formatHungarianTime } from 'src/app/date-adaptor'
import { CsoportType } from 'src/app/models/csapat'
import { Foglalkozas, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'
import { Layout } from 'src/app/models/state'
import { computeElapsedBeforeDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'

const minutesToMillis = 60 * 1000

@Component({
    selector: 'app-terv',
    templateUrl: './terv.component.html',
    styleUrls: ['./terv.component.scss']
})
export class TervComponent {

    @Input() start!: Date
    @Input() terv!: Terv

    Layout = Layout

    constructor(
        public readonly fogSor: FoglalkozasService,
        public readonly state: StateService,
    ) {
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

    canEditTerv(): boolean {
        return this.state.szemszog.type === CsoportType.Csapat && [
                FoglalkozasType.CsapatTerv,
            ].includes(this.terv.type) ||

            this.state.szemszog.type === CsoportType.Raj && [
                FoglalkozasType.RajTerv,
            ].includes(this.terv.type) ||

            this.state.szemszog.type === CsoportType.Ors && [
                FoglalkozasType.OrsiTerv,
            ].includes(this.terv.type)
    }
}
