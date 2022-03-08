import { Component, Inject, Input } from '@angular/core'
import { CsapatFoglalkozas } from '../models/foglalkozas'
import { Rang } from '../models/csapat'
import { map, Observable } from 'rxjs'
import { RANG } from '../injection-tokens'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent {

    @Input() csapatFoglalkozas!: CsapatFoglalkozas

    editableEditor$: Observable<boolean>

    constructor(
        @Inject(RANG) rang$: Observable<Rang>,
    ) {
        this.editableEditor$ = rang$.pipe(
            map(rang => rang === Rang.CserkeszTiszt),
        )
    }
}
