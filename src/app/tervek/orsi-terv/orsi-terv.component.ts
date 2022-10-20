import { Component, Input } from '@angular/core'
import { computeRemainingDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { isOrsSzemszog, isRajSzemszog, Ors } from 'src/app/models/csapat'
import { createFoglalkozas, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, Terv } from 'src/app/models/foglalkozas'
import { StateService } from 'src/app/services/state.service'

@Component({
    selector: 'app-orsi-terv',
    templateUrl: './orsi-terv.component.html',
    styleUrls: ['./orsi-terv.component.scss']
})
export class OrsiTervComponent {

    @Input() start!: Date
    @Input() orsiTerv!: Terv

    isOrsSzemszog = isOrsSzemszog
    isRajSzemszog = isRajSzemszog

    computeRemainingDuration = computeRemainingDuration

    constructor(
        public readonly fogSor: FoglalkozasService,
        public readonly state: StateService,
    ) {
    }

    addOrsiFoglalkozas(children: Foglalkozas[]) {
        const ors = this.state.szemszog as Ors

        const newOrsiFoglalkozas = createFoglalkozas(
            FoglalkozasType.OrsiFoglalkozas,
            ors.name,
            Math.min(computeRemainingDuration(this.orsiTerv, children), 15),
        ) as OrsiFoglalkozas

        // Duplicate the fields that are useful from last foglalkozas
        if (children.length > 0) {
            const lastFoglalkozas = children[children.length - 1] as OrsiFoglalkozas
            newOrsiFoglalkozas.age = lastFoglalkozas.age
            newOrsiFoglalkozas.cserkeszUid = lastFoglalkozas.cserkeszUid
            newOrsiFoglalkozas.probaUid = lastFoglalkozas.probaUid
        }

        this.fogSor.addChild(this.orsiTerv, newOrsiFoglalkozas, true)
    }

    get children$() {
        return this.fogSor.filterChildren(this.orsiTerv)
    }
}
