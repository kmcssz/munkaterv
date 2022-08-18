import { Component, Inject, Input } from '@angular/core'
import { filter, map, Observable, Subject } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { Csapat, isCsapatSzemszog, Raj, Szemszog } from '../../models/csapat'
import { ConcurrentTervek, CsapatFoglalkozas, CsapatTerv, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
})
export class CsapatTervComponent {

    @Input() start!: Date
    @Input() csapatTerv!: CsapatTerv

    destroy$ = new Subject<boolean>()
    editable$: Observable<boolean>
    csapat$: Observable<Csapat>

    constructor(
        @Inject(SZEMSZOG) private szemszog$: Observable<Szemszog>,
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))

        this.csapat$ = szemszog$.pipe(
            filter(isCsapatSzemszog),
            map(szemszog => szemszog.csoport as Csapat),
        )
    }

    addCsapatFoglalkozas() {
        this.csapatTerv.foglalkozasok.push(new CsapatFoglalkozas())
        console.log(this.csapatTerv)
    }

    addRajFoglalkozas(csapat: Csapat) {
        const rajTervek = new Map<Raj, RajTerv>()
        csapat.rajok.forEach(raj => rajTervek.set(raj, new RajTerv()))
        this.csapatTerv.foglalkozasok.push(new ConcurrentTervek(90, rajTervek))
    }
}
