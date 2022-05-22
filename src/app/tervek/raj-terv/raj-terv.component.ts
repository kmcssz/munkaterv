import { Component, Inject, Input } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { isCsapatSzemszog, isRajSzemszog, Szemszog } from '../../models/csapat'
import { Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-terv',
    templateUrl: './raj-terv.component.html',
    styleUrls: ['./raj-terv.component.scss']
})
export class RajTervComponent {

    @Input() start!: Date
    @Input() rajTerv!: RajTerv

    editableTime$: Observable<boolean>
    editableContent$: Observable<boolean>

    FoglalkozasType = FoglalkozasType
    RajFoglalkozas = RajFoglalkozas
    OrsiFoglalkozas = OrsiFoglalkozas

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editableTime$ = szemszog$.pipe(map(isCsapatSzemszog))
        this.editableContent$ = szemszog$.pipe(map(isRajSzemszog))
    }

    private addFoglalkozas(foglalkozas: Foglalkozas) {
        foglalkozas.duration = Math.min(this.rajTerv.computeRemainingDuration(), foglalkozas.duration)
        this.rajTerv.foglalkozasok.push(foglalkozas)
    }

    addRajFoglalkozas() {
        this.addFoglalkozas(new RajFoglalkozas())
    }

    addOrsiTerv() {
        this.addFoglalkozas(new OrsiTerv())
    }
}
