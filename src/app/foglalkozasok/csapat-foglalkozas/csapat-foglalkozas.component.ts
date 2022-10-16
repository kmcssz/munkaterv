import { Component, Inject, Input, OnInit } from '@angular/core'
import { Foglalkozas } from '../../models/foglalkozas'
import { isCsapatSzemszog, Layout, Szemszog } from '../../models/csapat'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'

@Component({
    selector: 'app-csapat-foglalkozas',
    templateUrl: './csapat-foglalkozas.component.html',
    styleUrls: ['./csapat-foglalkozas.component.scss']
})
export class CsapatFoglalkozasComponent implements OnInit {

    @Input() csapatFoglalkozas!: Foglalkozas

    Layout = Layout

    editable$: Observable<boolean>
    layout$: Observable<Layout>

    constructor(
        public fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(map(isCsapatSzemszog))
        this.layout$ = szemszog$.pipe(map(szemszog => szemszog.layout))
    }

    ngOnInit() {
        if (this.csapatFoglalkozas.program === undefined) {
            this.csapatFoglalkozas.program = ""
        }
    }

    changed() {
        this.fogSor.putFoglalkozas(this.csapatFoglalkozas)
    }
}
