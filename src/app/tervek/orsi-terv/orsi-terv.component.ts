import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable } from 'rxjs'
import { FoglalkozasService } from 'src/app/foglalkozas.service'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { isOrsSzemszog, isRajSzemszog, Ors, Szemszog } from 'src/app/models/csapat'
import { createFoglalkozas, FoglalkozasType, Terv } from 'src/app/models/foglalkozas'

@Component({
    selector: 'app-orsi-terv',
    templateUrl: './orsi-terv.component.html',
    styleUrls: ['./orsi-terv.component.scss']
})
export class OrsiTervComponent {

    @Input() start!: Date
    @Input() orsiTerv!: Terv

    editableDuration$: Observable<boolean>
    editableAdding$: Observable<boolean>
    ors$: Observable<Ors>

    constructor(
        public fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editableDuration$ = szemszog$.pipe(map(isRajSzemszog))
        this.editableAdding$ = szemszog$.pipe(map(szSz => isRajSzemszog(szSz) || isOrsSzemszog(szSz)))
        this.ors$ = szemszog$.pipe(
            filter(isOrsSzemszog),
            map(szSz => szSz.csoport as Ors),
        )
    }

    addOrsiFoglalkozas(ors: Ors) {
        this.fogSor.addChild(this.orsiTerv, createFoglalkozas(
            FoglalkozasType.OrsiFoglalkozas,
            ors.name,
            Math.min(this.fogSor.computeRemainingDuration(this.orsiTerv), 15),
        ))
    }
}
