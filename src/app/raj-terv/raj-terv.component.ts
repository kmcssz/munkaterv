import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { RANG } from '../injection-tokens'
import { Rang } from '../models/csapat'
import { OrsiFoglalkozas, RajFoglalkozas, RajTerv } from '../models/foglalkozas'

@Component({
    selector: 'app-raj-terv',
    templateUrl: './raj-terv.component.html',
    styleUrls: ['./raj-terv.component.scss']
})
export class RajTervComponent implements OnInit {

    @Input() rajTerv!: RajTerv

    editable$: Observable<boolean>

    constructor(
        @Inject(RANG) rang$: Observable<Rang>
    ) {
        this.editable$ = rang$.pipe(
            map(rang => rang === Rang.SegedTiszt),
        )
    }

    ngOnInit(): void {
    }

    addRajFoglalkozas() {
        this.rajTerv.foglalkozasok.push(new RajFoglalkozas())
    }

    addOrsiFoglalkozas() {
        this.rajTerv.foglalkozasok.push(new OrsiFoglalkozas())
    }
}
