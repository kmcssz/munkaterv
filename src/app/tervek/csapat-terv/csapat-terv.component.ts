import { Component, Inject, Input } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { isCsapatSzemszog, Szemszog } from '../../models/csapat'
import { CsapatFoglalkozas, CsapatTerv, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-csapat-terv',
    templateUrl: './csapat-terv.component.html',
    styleUrls: ['./csapat-terv.component.scss'],
})
export class CsapatTervComponent {

    @Input() start!: Date
    @Input() csapatTerv!: CsapatTerv

    editable$: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) private szemszog$: Observable<Szemszog>,
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))
    }

    addCsapatFoglalkozas() {
        this.csapatTerv.foglalkozasok.push(new CsapatFoglalkozas())
    }

    addRajFoglalkozas() {
        this.csapatTerv.foglalkozasok.push(new RajTerv())
    }
}
