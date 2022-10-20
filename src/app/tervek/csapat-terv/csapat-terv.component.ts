import { Component, Input } from '@angular/core'
import { Subject } from 'rxjs'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { StateService } from 'src/app/services/state.service'
import { Csapat, isCsapatSzemszog } from '../../models/csapat'
import { createConcurrentTervek, createFoglalkozas, createTerv, FoglalkozasType, Terv } from '../../models/foglalkozas'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
})
export class CsapatTervComponent {

    @Input() start!: Date
    @Input() csapatTerv!: Terv

    isCsapatSzemszog = isCsapatSzemszog

    destroy$ = new Subject<boolean>()

    constructor(
        private readonly fogSor: FoglalkozasService,
        public readonly state: StateService,
    ) {
    }

    addCsapatFoglalkozas() {
        this.fogSor.addChild(
            this.csapatTerv,
            createFoglalkozas(FoglalkozasType.CsapatFoglalkozas, this.state.szemszog.name),
            true,
        )
    }

    addRajTerv() {
        const csapat = this.state.szemszog as Csapat

        const defaultRajDuration = 90
        const concurrentTerv = createConcurrentTervek(FoglalkozasType.RajTerv, csapat.name, defaultRajDuration)
        csapat.rajok.forEach(raj => {
            this.fogSor.addChild(concurrentTerv, createTerv(FoglalkozasType.RajTerv, raj.name, defaultRajDuration), false)
        })
        this.fogSor.addChild(this.csapatTerv, concurrentTerv, true)
    }
}
