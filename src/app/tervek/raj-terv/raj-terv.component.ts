import { Component, Inject, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { SZEMSZOG } from '../../injection-tokens'
import { CsoportType, Rang, Szemszog } from '../../models/csapat'
import { OrsiFoglalkozas, RajFoglalkozas, RajTerv } from '../../models/foglalkozas'

@Component({
    selector: 'app-raj-terv',
    templateUrl: './raj-terv.component.html',
    styleUrls: ['./raj-terv.component.scss']
})
export class RajTervComponent implements OnInit {

    @Input() rajTerv!: RajTerv

    editable$: Observable<boolean>

    constructor(
        @Inject(SZEMSZOG) szemszog$: Observable<Szemszog>
    ) {
        this.editable$ = szemszog$.pipe(
            map(szemszog => szemszog.csoport.type === CsoportType.Raj),
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
