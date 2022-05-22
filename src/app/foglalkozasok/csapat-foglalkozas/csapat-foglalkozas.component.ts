import { Component, Inject, Input } from '@angular/core'
import { CsapatFoglalkozas } from '../../models/foglalkozas'
import { CsoportType, isCsapatSzemszog, Szemszog } from '../../models/csapat'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent {

    @Input() csapatFoglalkozas!: CsapatFoglalkozas

    editable$: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))
    }
}
