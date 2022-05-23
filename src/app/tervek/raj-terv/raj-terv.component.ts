import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { isCsapatSzemszog, isRajSzemszog, Ors, Raj, Szemszog } from '../../models/csapat'
import { ConcurrentTervek, Foglalkozas, FoglalkozasType, OrsiFoglalkozas, OrsiTerv, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

@UntilDestroy()
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
    raj?: Raj

    FoglalkozasType = FoglalkozasType
    RajFoglalkozas = RajFoglalkozas
    OrsiFoglalkozas = OrsiFoglalkozas

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editableTime$ = szemszog$.pipe(map(isCsapatSzemszog))
        this.editableContent$ = szemszog$.pipe(map(isRajSzemszog))

        szemszog$.pipe(
            filter(isRajSzemszog),
            untilDestroyed(this)
        ).subscribe(szSz => this.raj = szSz.csoport as Raj)
    }

    private addFoglalkozas(foglalkozas: Foglalkozas) {
        foglalkozas.duration = Math.min(this.rajTerv.computeRemainingDuration(), foglalkozas.duration)
        this.rajTerv.foglalkozasok.push(foglalkozas)
    }

    addRajFoglalkozas() {
        this.addFoglalkozas(new RajFoglalkozas())
    }

    addOrsiTerv() {
        const orsiTervek = new Map<Ors, OrsiTerv>()
        this.raj?.orsok.forEach(ors => orsiTervek.set(ors, new OrsiTerv()))
        this.addFoglalkozas(new ConcurrentTervek(60, orsiTervek))
    }
}
