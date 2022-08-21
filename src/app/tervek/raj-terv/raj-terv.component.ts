import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable } from 'rxjs'
import { FoglalkozasService } from 'src/app/foglalkozas.service'
import { SZEMSZOG } from '../../injection-tokens'
import { isCsapatSzemszog, isRajSzemszog, Raj, Szemszog } from '../../models/csapat'
import { createFoglalkozas, createTerv, Foglalkozas, FoglalkozasType, Terv } from '../../models/foglalkozas'

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

    private addFoglalkozas(foglalkozas: Foglalkozas) {
        // Clip foglalkozas duration
        foglalkozas.duration = Math.min(this.fogSor.computeRemainingDuration(this.rajTerv), foglalkozas.duration)
        this.fogSor.addChild(this.rajTerv, foglalkozas)
    }

    addRajFoglalkozas(raj: Raj) {
        this.addFoglalkozas(createFoglalkozas(FoglalkozasType.RajFoglalkozas, raj.name))
    }

    addOrsiTerv(raj: Raj) {
        const concurrentTerv = createTerv(FoglalkozasType.ConcurrentTervek, raj.name, 60)
        raj.orsok.forEach(ors => {
            this.fogSor.addChild(concurrentTerv, createTerv(FoglalkozasType.OrsiTerv, ors.name))
        })
        this.fogSor.addChild(this.rajTerv, concurrentTerv)
    }
}
