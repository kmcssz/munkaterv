import { Component, Input } from '@angular/core'
import { computeRemainingDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { isRajSzemszog, Raj } from '../../models/csapat'
import { createConcurrentTervek as createConcurrentTerv, createFoglalkozas, createTerv, Foglalkozas, FoglalkozasType, Terv } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-terv',
    templateUrl: './raj-terv.component.html',
    styleUrls: ['./raj-terv.component.scss']
})
export class RajTervComponent {

    @Input() start!: Date
    @Input() rajTerv!: Terv

    isRajSzemszog = isRajSzemszog

    computeRemainingDuration = computeRemainingDuration

    constructor(
        public readonly fogSor: FoglalkozasService,
        public readonly state: StateService,
    ) {
    }

    private addFoglalkozas(foglalkozas: Foglalkozas, children: Foglalkozas[]) {
        // Clip foglalkozas duration
        foglalkozas.duration = Math.min(computeRemainingDuration(this.rajTerv, children), foglalkozas.duration)
        this.fogSor.addChild(this.rajTerv, foglalkozas, true)
    }

    addRajFoglalkozas(children: Foglalkozas[]) {
        this.addFoglalkozas(createFoglalkozas(FoglalkozasType.RajFoglalkozas, this.state.szemszog.name), children)
    }

    addOrsiTerv() {
        const raj = this.state.szemszog as Raj
        const defaultOrsiDuration = 60
        const concurrentTerv = createConcurrentTerv(FoglalkozasType.OrsiTerv, raj.name, defaultOrsiDuration)
        raj.orsok.forEach(ors => {
            this.fogSor.addChild(
                concurrentTerv,
                createTerv(FoglalkozasType.OrsiTerv, ors.name, defaultOrsiDuration),
                false,
            )
        })
        this.fogSor.addChild(this.rajTerv, concurrentTerv, true)
    }

    get children$() {
        return this.fogSor.filterChildren(this.rajTerv)
    }
}
