import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core'
import { getDefaultAngularEditorConfig } from '../angular-editor'
import { CsapatFoglalkozas } from '../models/foglalkozas'
import { v4 as uuidv4 } from 'uuid'
import { Rang } from '../models/csapat'
import { map, Observable, Subject, takeUntil } from 'rxjs'
import { RANG } from '../injection-tokens'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent implements OnDestroy {

    @Input() csapatFoglalkozas!: CsapatFoglalkozas

    destroy$ = new Subject<boolean>()

    editorConfig = getDefaultAngularEditorConfig()
    uuidv4 = uuidv4

    constructor(
        @Inject(RANG) rang$: Observable<Rang>,
    ) {
        rang$.pipe(
            map(rang => rang === Rang.CserkeszTiszt),
            takeUntil(this.destroy$),
        ).subscribe(editable => {
            this.editorConfig.editable = editable
            this.editorConfig.showToolbar = editable
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()
    }
}
