import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { isCsapatSzemszog, isRajSzemszog, Ors, Raj, Szemszog } from '../../models/csapat'
import { ConcurrentTervek, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

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
    raj$: Observable<Raj>

    FoglalkozasType = FoglalkozasType
    RajFoglalkozas = RajFoglalkozas
    OrsiFoglalkozas = OrsiFoglalkozas

    constructor(
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
        foglalkozas.duration = Math.min(this.rajTerv.computeRemainingDuration(), foglalkozas.duration)
        this.rajTerv.foglalkozasok.push(foglalkozas)
    }

    addRajFoglalkozas() {
        this.addFoglalkozas(new RajFoglalkozas())
    }

    addOrsiTerv(raj: Raj) {
        const orsiTervek = new Map<Ors, OrsiTerv>()
        raj.orsok.forEach(ors => orsiTervek.set(ors, new OrsiTerv()))
        this.addFoglalkozas(new ConcurrentTervek(60, orsiTervek))
    }
}
