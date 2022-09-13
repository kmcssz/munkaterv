import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable, Subject } from 'rxjs'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { SZEMSZOG } from '../../injection-tokens'
import { Csapat, isCsapatSzemszog, Raj, Szemszog } from '../../models/csapat'
import { createConcurrentTervek, createFoglalkozas, createTerv,  FoglalkozasType, Terv } from '../../models/foglalkozas'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
})
export class CsapatTervComponent {

    @Input() start!: Date
    @Input() csapatTerv!: Terv

    destroy$ = new Subject<boolean>()
    editable$: Observable<boolean>
    csapat$: Observable<Csapat>

    constructor(
        private fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) private szemszog$: Observable<Szemszog>,
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))

        this.csapat$ = szemszog$.pipe(
            filter(isCsapatSzemszog),
            map(szemszog => szemszog.csoport as Csapat),
        )
    }

    addCsapatFoglalkozas(csapat: Csapat) {
        this.fogSor.addChild(
            this.csapatTerv,
            createFoglalkozas(FoglalkozasType.CsapatFoglalkozas, csapat.name),
            true,
        )
    }

    addRajTerv(csapat: Csapat) {
        const defaultRajDuration = 90
        const concurrentTerv = createConcurrentTervek(FoglalkozasType.RajTerv, csapat.name, defaultRajDuration)
        csapat.rajok.forEach(raj => {
            this.fogSor.addChild(concurrentTerv, createTerv(FoglalkozasType.RajTerv, raj.name, defaultRajDuration), false)
        })
        this.fogSor.addChild(this.csapatTerv, concurrentTerv, true)
    }
}
