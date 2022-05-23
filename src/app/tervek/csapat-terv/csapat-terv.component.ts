import { Component, Inject, Input } from '@angular/core'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { filter, map, Observable, Subject } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { Csapat, isCsapatSzemszog, Raj, Szemszog } from '../../models/csapat'
import { ConcurrentTervek, CsapatFoglalkozas, CsapatTerv, RajTerv } from '../../models/foglalkozas'

@UntilDestroy()
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
    csapat?: Csapat

    constructor(
        @Inject(SZEMSZOG) private szemszog$: Observable<Szemszog>,
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))

        szemszog$.pipe(
            filter(isCsapatSzemszog),
            untilDestroyed(this)
        ).subscribe(szemszog => {
            this.csapat = szemszog.csoport as Csapat
        })
    }

    addCsapatFoglalkozas() {
        this.csapatTerv.foglalkozasok.push(new CsapatFoglalkozas())
    }

    addRajFoglalkozas() {
        const rajTervek = new Map<Raj, RajTerv>()
        this.csapat!.rajok.forEach(raj => rajTervek.set(raj, new RajTerv()))
        this.csapatTerv.foglalkozasok.push(new ConcurrentTervek(90, rajTervek))
    }
}
