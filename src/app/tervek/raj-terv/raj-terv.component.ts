import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable } from 'rxjs'
import { computeRemainingDuration, FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from '../../injection-tokens'
import { isCsapatSzemszog, isRajSzemszog, Raj, Szemszog } from '../../models/csapat'
import { createConcurrentTervek as createConcurrentTerv, createFoglalkozas, createTerv, Foglalkozas, FoglalkozasType, Terv } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-terv',
    templateUrl: './raj-terv.component.html',
    styleUrls: ['./raj-terv.component.scss']
})
export class RajTervComponent {

    @Input() start!: Date
    @Input() rajTerv!: Terv

    editableTime$: Observable<boolean>
    editableContent$: Observable<boolean>
    raj$: Observable<Raj>

    computeRemainingDuration = computeRemainingDuration

    constructor(
        public fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editableTime$ = szemszog$.pipe(map(isCsapatSzemszog))
        this.editableContent$ = szemszog$.pipe(map(isRajSzemszog))

        this.raj$ = szemszog$.pipe(
            filter(isRajSzemszog),
            map(szSz => szSz.csoport as Raj),
        )
    }

    private addFoglalkozas(foglalkozas: Foglalkozas, children: Foglalkozas[]) {
        // Clip foglalkozas duration
        foglalkozas.duration = Math.min(computeRemainingDuration(this.rajTerv, children), foglalkozas.duration)
        this.fogSor.addChild(this.rajTerv, foglalkozas)
    }

    addRajFoglalkozas(raj: Raj, children: Foglalkozas[]) {
        this.addFoglalkozas(createFoglalkozas(FoglalkozasType.RajFoglalkozas, raj.name), children)
    }

    addOrsiTerv(raj: Raj) {
        const defaultOrsiDuration = 60
        const concurrentTerv = createConcurrentTerv(FoglalkozasType.OrsiTerv, raj.name, defaultOrsiDuration)
        raj.orsok.forEach(ors => {
            this.fogSor.addChild(concurrentTerv, createTerv(FoglalkozasType.OrsiTerv, ors.name, defaultOrsiDuration))
        })
        this.fogSor.addChild(this.rajTerv, concurrentTerv)
    }

    get children$() {
        return this.fogSor.filterChildren(this.rajTerv)
    }
}
