import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from 'src/app/injection-tokens'
import { isRajSzemszog, Szemszog } from '../../models/csapat'
import { Foglalkozas } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-foglalkozas',
    templateUrl: './raj-foglalkozas.component.html',
    styleUrls: ['./raj-foglalkozas.component.scss']
})
export class RajFoglalkozasComponent implements OnInit {

    @Input() rajFoglalkozas!: Foglalkozas

    editable$: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(map(isRajSzemszog))
    }

    ngOnInit() {
        if (this.rajFoglalkozas.program === undefined) {
            this.rajFoglalkozas.program = ""
        }
    }
}
