import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { FoglalkozasService } from 'src/app/services/foglalkozas.service'
import { isRajSzemszog, Layout, Szemszog } from '../../models/csapat'
import { Foglalkozas } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-foglalkozas',
    templateUrl: './raj-foglalkozas.component.html',
    styleUrls: ['./raj-foglalkozas.component.scss']
})
export class RajFoglalkozasComponent implements OnInit {

    @Input() rajFoglalkozas!: Foglalkozas

    Layout = Layout

    editable$: Observable<boolean>
    layout$: Observable<Layout>

    constructor(
        public fogSor: FoglalkozasService,
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(map(isRajSzemszog))
        this.layout$ = szemszog$.pipe(map(szemszog => szemszog.layout))
    }

    ngOnInit() {
        if (this.rajFoglalkozas.program === undefined) {
            this.rajFoglalkozas.program = ""
        }
    }

    changed() {
        this.fogSor.putFoglalkozas(this.rajFoglalkozas)
    }
}
